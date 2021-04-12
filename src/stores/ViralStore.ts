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

type ViralDetails = {
  unsimulated: number;
  infected: number;
  death: number;
  recovered: number;
  inoculated: number;
};

type MachineTransitionedTurn = {
  infected?: number;
  death?: number;
  recovered?: number;
  inoculated?: number;
};

type MachineComponent = {
  machine: PersonState;
  represents: number;
  transitionedTurn: MachineTransitionedTurn;
};

type State = {
  rBaseline: number;
  cfr: number;

  persons: Record<string, MachineComponent[]>;
  unsimulated: Record<string, number>;

  personsInitialised: boolean;

  getMachines: (residentState: string) => MachineComponent[];
  getMachinesTotal: (residentState: string) => number;
  getMachinesStates: (residentState: string) => Record<string, unknown>;
  // getWeeklyDetails: (residentState: string) => ViralDetails;
  getViralDetails: (residentState?: string) => ViralDetails;

  setUnsimulated: () => void;

  generateOutbreak: (turn: number) => void;
  generateLocalInfection: (
    residentState: string,
    turn: number,
    infectors?: number
  ) => void;

  takeTurn: (turn: number) => void;

  reset: () => void;
};

const useViralStore = create<State>(
  immer((set, get) => ({
    rBaseline: 2,
    cfr: 0.02,

    persons: {},
    unsimulated: {},

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

    // getWeeklyDetails: (residentState) => {
    //   const { persons } = get();
    //   const weeklyDetails: Record<string, number> = {};

    //   const stateResidents = persons[residentState];
    // },

    getViralDetails: (residentState) => {
      const { unsimulated, persons } = get();

      const viralDetails = {
        unsimulated: residentState
          ? unsimulated[residentState]
          : Object.values(unsimulated).reduce(
              (accumulator, current) => current + accumulator,
              0
            ),
        infected: 0,
        death: 0,
        recovered: 0,
        inoculated: 0,
      };

      const calculateViralDetails = (stateResidents: MachineComponent[]) => {
        if (!stateResidents) return;

        for (const resident of stateResidents) {
          const { represents } = resident;
          const key = resident.machine.value.toString();
          viralDetails[key] += represents;
        }
      };

      if (residentState) {
        calculateViralDetails(persons[residentState]);
      } else {
        Object.values(persons).forEach((p) => calculateViralDetails(p));
      }

      return viralDetails;
    },

    setUnsimulated: () =>
      set((state) => {
        state.unsimulated = states.features.reduce((obj, s) => {
          return { ...obj, [s.properties.name]: s.properties.population };
        }, {});
      }),

    generateOutbreak: (turn) => {
      const { features } = states;
      const { generateLocalInfection } = get();

      // Selects state of outbreak
      const randomStateIndex = Math.floor(Math.random() * features.length);
      const firstOutbreakState = features[randomStateIndex].properties.name;
      console.log(firstOutbreakState);

      // Infects patient
      generateLocalInfection(firstOutbreakState, turn);

      set((state) => {
        state.personsInitialised = true;
      });
    },

    generateLocalInfection: (
      residentState,
      turn,
      infectors = get().rBaseline
    ) => {
      const newMachine = createPersonMachine();

      const patient = {
        machine: personMachine.transition(newMachine, 'Infect'),
        represents: Math.round(infectors ** 2),
        transitionedTurn: { infected: turn },
      };

      // Generate 8 turns

      // Infects patient
      set((state) => {
        if (!state.persons[residentState]) state.persons[residentState] = [];
        state.persons[residentState].push(patient);
        state.unsimulated[residentState] -= patient.represents;
      });
    },

    takeTurn: (turn) =>
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
                transitionedTurn: { infected: turn },
              };

              state.persons[residentState].push(patient);
              state.unsimulated[residentState] -= patient.represents;

              // Adds new state machines representing recoveries and deaths
              const deaths = Math.round(represents * cfr);
              const recoveries = represents - deaths;

              if (deaths !== 0) {
                const dead = {
                  machine: personMachine.transition(oldP.machine, 'Death'),
                  represents: deaths,
                  transitionedTurn: {
                    ...oldP.transitionedTurn,
                    death: turn,
                  },
                };

                state.persons[residentState].push(dead);
              }

              if (recoveries !== 0) {
                const recovered = {
                  machine: personMachine.transition(oldP.machine, 'Recover'),
                  represents: recoveries,
                  transitionedTurn: {
                    ...oldP.transitionedTurn,
                    recovered: turn,
                  },
                };

                state.persons[residentState].push(recovered);
              }
            }
          }
        }
      }),

    reset: () => {
      get().setUnsimulated();

      set((state) => {
        state.persons = {};
        state.personsInitialised = false;
      });
    },
  }))
);

export default useViralStore;
