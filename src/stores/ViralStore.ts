/* eslint-disable no-restricted-syntax */
import create from 'zustand';
import lodash from 'lodash';
import immer from './shared/immer';
import {
  createPersonMachine,
  personMachine,
  PersonState,
} from './viral/person.machine';
import states from '../../map/geojson/states.json';

type MachineComponent = {
  machine: PersonState;
  represents: number;
};

type UnsimulatedDetails = {
  uninfected: number;
  inoculations: number;
  deaths: number;
};

type State = {
  rBaseline: number;
  cfr: number;

  persons: Record<string, MachineComponent[]>;
  unsimulatedDetails: Record<string, UnsimulatedDetails>;

  personsInitialised: boolean;

  getMachines: (residentState: string) => MachineComponent[];
  getMachinesTotal: (residentState: string) => number;
  getMachinesStates: (residentState: string) => Record<string, unknown>;
  getViralDetails: (residentState: string) => Record<string, unknown>;

  generateOutbreak: () => void;
  generateLocalInfection: (residentState: string, infectors?: number) => void;

  takeTurn: () => void;

  reset: () => void;
};

const useViralStore = create<State>(
  immer((set, get) => ({
    rBaseline: 2,
    cfr: 0.02,

    persons: {},
    unsimulatedDetails: {},

    personsInitialised: false,

    getMachines: (residentState) => get().persons[residentState],

    getMachinesTotal: (residentState) => {
      const stateResidents = get().persons[residentState];
      return stateResidents ? stateResidents.length : 0;
    },

    getMachinesStates: (residentState) => {
      const machinesStates: Record<string, number> = {};
      const stateResidents = get().persons[residentState];

      if (!stateResidents) return machinesStates;

      for (const resident of stateResidents) {
        const key = resident.machine.value.toString();
        machinesStates[key] = machinesStates[key] + 1 || 1;
      }

      return machinesStates;
    },

    getViralDetails: (residentState) => {
      const viralDetails: Record<string, number> = {};
      const stateResidents = get().persons[residentState];

      if (!stateResidents) return viralDetails;

      for (const resident of stateResidents) {
        const { represents } = resident;
        const key = resident.machine.value.toString();
        viralDetails[key] = viralDetails[key] + represents || represents;
      }

      return viralDetails;
    },

    generateOutbreak: () => {
      const { features } = states;
      const { generateLocalInfection } = get();

      // Selects state of outbreak
      const randomStateIndex = Math.floor(Math.random() * features.length);
      const firstOutbreakState = features[randomStateIndex].properties.name;
      console.log(firstOutbreakState);

      // Infects patient
      generateLocalInfection(firstOutbreakState);

      set((state) => {
        state.personsInitialised = true;
      });
    },

    generateLocalInfection: (residentState, infectors = get().rBaseline) => {
      const newMachine = createPersonMachine();

      const patient = {
        machine: personMachine.transition(newMachine, 'Infect'),
        represents: Math.round(infectors ** 2),
      };

      // Generate 8 turns

      // Infects patient
      set((state) => {
        if (!state.persons[residentState]) state.persons[residentState] = [];
        state.persons[residentState].push(patient);
      });
    },

    takeTurn: () =>
      set((state) => {
        const { cfr } = state;
        const persons = lodash.cloneDeep(state.persons);

        for (const [residentState, statePersons] of Object.entries(persons)) {
          for (let i = 0; i < statePersons.length; i += 1) {
            const p = statePersons[i];

            if (p.machine.matches('infected')) {
              // Removes current state machine
              const oldP = state.persons[residentState].splice(i, 1)[0];
              const { represents } = oldP;

              // Infects more state residents
              const newMachine = createPersonMachine();

              const patient = {
                machine: personMachine.transition(newMachine, 'Infect'),
                represents: Math.round(represents * 1.4),
              };

              state.persons[residentState].push(patient);

              // Adds new state machines representing recoveries and deaths
              const deaths = Math.round(represents * cfr);
              const recoveries = represents - deaths;

              if (deaths !== 0) {
                const dead = {
                  machine: personMachine.transition(oldP.machine, 'Death'),
                  represents: deaths,
                };

                state.persons[residentState].push(dead);
              }

              if (recoveries !== 0) {
                const recovered = {
                  machine: personMachine.transition(oldP.machine, 'Recover'),
                  represents: recoveries,
                };

                state.persons[residentState].push(recovered);
              }
            }
          }
        }
      }),

    reset: () =>
      set((state) => {
        state.persons = {};
        state.unsimulatedDetails = {};
        state.personsInitialised = false;
      }),
  }))
);

export default useViralStore;
