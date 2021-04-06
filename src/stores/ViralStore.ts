/* eslint-disable no-restricted-syntax */
import create from 'zustand';
import flat from 'flat';
import { StateValue } from 'xstate';
import immer from './shared/immer';
import { createPersonMachine, PersonState } from './viral/person.machine';

type State = {
  persons: Record<string, PersonState[]>;
  personsInitialised: boolean;

  createPerson: (infects: number, residentState: string) => void;

  getPersonsByState: (residentState: string) => PersonState[];
  getPersonsTotalByState: (residentState: string) => number;
  getPersonsStatesByState: (residentState: string) => Record<string, unknown>;

  setPersonsInitialised: (initialised: boolean) => void;

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
    persons: {},
    personsInitialised: false,

    createPerson: (infects, residentState) => {
      set((state) => {
        const machine = createPersonMachine(infects, residentState);
        if (!state.persons[residentState]) {
          state.persons[residentState] = [];
        }
        state.persons[residentState].push(machine);
      });
    },

    getPersonsByState: (residentState) => get().persons[residentState],
    getPersonsTotalByState: (residentState) => {
      const stateResidents = get().persons[residentState];
      return stateResidents ? stateResidents.length : 0;
    },

    getPersonsStatesByState: (residentState) => {
      const personsStateByState: Record<string, number> = {};
      const stateResidents = get().persons[residentState];

      for (const resident of stateResidents) {
        const compositeKey = convertStateValueToCompositeKey(resident.value);
        personsStateByState[compositeKey] =
          personsStateByState[compositeKey] + 1 || 1;
      }

      return personsStateByState;
    },

    setPersonsInitialised: (initialised) => {
      set((state) => {
        state.personsInitialised = initialised;
      });
    },

    takeTurn: () => {},

    reset: () => {
      set((state) => {
        state.persons = {};
        state.personsInitialised = false;
      });
    },
  }))
);

export default useViralStore;
