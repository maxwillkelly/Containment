/* eslint-disable no-restricted-syntax */
import create from 'zustand';
import flat from 'flat';
import { StateValue } from 'xstate';
import immer from './shared/immer';
import {
  createPersonMachine,
  personMachine,
  PersonState,
} from './viral/person.machine';
import states from '../../map/geojson/states.json';

type MachineState = {
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

  persons: Record<string, MachineState[]>;
  unsimulatedDetails: Record<string, UnsimulatedDetails>;

  personsInitialised: boolean;

  getPersonsByState: (residentState: string) => MachineState[];
  getPersonsTotalByState: (residentState: string) => number;
  getPersonsStatesByState: (residentState: string) => Record<string, unknown>;

  generateOutbreak: () => void;
  generateLocalInfection: (residentState: string, infectors?: number) => void;

  takeTurn: () => void;

  reset: () => void;
};

const convertStateValueToCompositeKey = (stateValue: StateValue) => {
  const compositeKeys = [];
  for (const [key, value] of Object.entries(flat(stateValue))) {
    compositeKeys.push(`${key}.${value}`);
  }
  return compositeKeys[compositeKeys.length - 1];
};

const useViralStore = create<State>(
  immer((set, get) => ({
    rBaseline: 2,
    cfr: 0.02,

    persons: {},
    unsimulatedDetails: {},

    personsInitialised: false,

    getPersonsByState: (residentState) => get().persons[residentState],

    getPersonsTotalByState: (residentState) => {
      const stateResidents = get().persons[residentState];
      return stateResidents ? stateResidents.length : 0;
    },

    getPersonsStatesByState: (residentState) => {
      const personsStateByState: Record<string, number> = {};
      const stateResidents = get().persons[residentState];

      if (!stateResidents) return personsStateByState;

      for (const resident of stateResidents) {
        const compositeKey = convertStateValueToCompositeKey(
          resident.machine.value
        );
        personsStateByState[compositeKey] =
          personsStateByState[compositeKey] + 1 || 1;
      }

      return personsStateByState;
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
        represents: Math.round(infectors ** 4),
      };

      // Infects patient
      set((state) => {
        if (!state.persons[residentState]) state.persons[residentState] = [];
        state.persons[residentState].push(patient);
      });
    },

    takeTurn: () => {
      set((state) => {
        const { persons, cfr, generateLocalInfection } = state;

        for (const [residentState, statePersons] of Object.entries(persons)) {
          for (let i = 0; i < statePersons.length; i += 1) {
            const p = statePersons[i];

            if (p.machine.matches('infected')) {
              // Removes current state machine
              const oldP = statePersons.splice(i, 1)[0];
              const { represents } = oldP;

              // Infects state residents
              generateLocalInfection(residentState, represents);

              // Adds new state machines representing recoveries and deaths
              const deaths = Math.round(represents * cfr);
              const recoveries = represents - deaths;

              const dead = {
                machine: personMachine.transition(oldP.machine, 'Death'),
                represents: deaths,
              };

              const recovered = {
                machine: personMachine.transition(oldP.machine, 'Recover'),
                represents: recoveries,
              };

              statePersons.push(recovered, dead);
            }
          }
        }
      });
    },

    reset: () => {
      set((state) => {
        state.persons = {};
        state.unsimulatedDetails = {};
        state.personsInitialised = false;
      });
    },
  }))
);

export default useViralStore;
