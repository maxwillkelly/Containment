/* eslint-disable no-restricted-syntax */
import flat from 'flat';
import create from 'zustand';
import lodash from 'lodash';
import immer from './shared/immer';
import {
  createPersonMachine,
  PersonMachine,
  States as personStates,
} from './viral/person.machine';

type State = {
  persons: Record<string, PersonMachine[]>;

  createPerson: (infects: number, residentState: string) => void;

  getPersonsByState: (residentState: string) => PersonMachine[];
  getPersonsTotalByState: (residentState: string) => number;
  getPersonsStatesByState: (residentState: string) => Record<string, unknown>;

  takeTurn: () => void;
};

const useViralStore = create<State>(
  immer((set, get) => ({
    persons: {},

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
      const personsStateByState: Record<string, unknown> = {};
      const personStateKeys: string[] = flat(personStates);
      const stateResidents = get().persons[residentState];

      for (const resident of stateResidents) {
        for (const possibleStates of personStateKeys) {
          if (resident.meta.matches(possibleStates)) {
            const query = lodash.get(personsStateByState, possibleStates);

            if (!query) {
              lodash.set(personsStateByState, possibleStates, 0);
            } else if (typeof query !== 'number') {
              console.error('Query has not returned a number');
              return personsStateByState;
            } else {
              lodash.set(personsStateByState, possibleStates, query + 1);
            }
          }
        }
      }

      return personsStateByState;
    },

    takeTurn: () => {},
  }))
);

export default useViralStore;
