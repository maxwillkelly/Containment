import create from 'zustand';
import immer from './shared/immer';
import { createPersonMachine, PersonMachine } from './viral/person.machine';

type State = {
  persons: Record<string, PersonMachine[]>;

  createPerson: (infects: number, residentState: string) => void;

  getPersonsByState: (residentState: string) => PersonMachine[];
  getPersonsTotalByState: (residentState: string) => number;

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

    takeTurn: () => {},
  }))
);

export default useViralStore;
