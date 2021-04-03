/* eslint-disable no-restricted-syntax */
import flat from 'flat';
import { flatten } from 'lodash';
import create from 'zustand';
import immer from './shared/immer';
import { createPersonMachine, PersonState } from './viral/person.machine';

type State = {
  persons: Record<string, PersonState[]>;

  createPerson: (infects: number, residentState: string) => void;

  getPersonsByState: (residentState: string) => PersonState[];
  getPersonsTotalByState: (residentState: string) => number;
  getPersonsStatesByState: (residentState: string) => Record<string, unknown>;

  takeTurn: () => void;
};

const convertObjectToCompositeKeys: string[] = (
  object: Record<string, unknown>
) => {
  const compositeKeys = [];
  for (const [key, value] of Object.entries(flat(object))) {
    compositeKeys.push(`${key}.${value}`);
  }
  return compositeKeys;
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
      // const personStateKeys: string[] = flat(personStates);
      const stateResidents = get().persons[residentState];

      // debugger;

      for (const resident of stateResidents) {
        console.log(resident);
        console.log(convertObjectToCompositeKeys(resident.value));
        // const { stateIds } = resident;
        // for (const stateId of stateIds) {
        //   console.log(
        //     `stateId: ${stateId}\tmatches: ${resident.meta.matches(stateId)}`
        //   );
        // }
        // break;
        // for (const possibleStates of personStateKeys) {
        //   if (resident.meta.matches(possibleStates)) {
        //     const query = lodash.get(personsStateByState, possibleStates);

        //     if (!query) {
        //       lodash.set(personsStateByState, possibleStates, 0);
        //     } else if (typeof query !== 'number') {
        //       console.error('Query has not returned a number');
        //       return personsStateByState;
        //     } else {
        //       lodash.set(personsStateByState, possibleStates, query + 1);
        //     }
        //   }
      }
      // }

      return personsStateByState;
    },

    takeTurn: () => {},
  }))
);

export default useViralStore;
