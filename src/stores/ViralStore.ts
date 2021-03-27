import create from 'zustand';
import immer from './shared/immer';
import { createPersonMachine, PersonMachine } from './viral/person.machine';

type State = {
  persons: PersonMachine[];
  addPerson: (person: PersonMachine) => void;
  createPerson: (infects: number, state: string) => void;
  takeTurn: () => void;
};

const useViralStore = create<State>(
  immer((set) => ({
    persons: [],
    addPerson: (person) => {
      set((state) => state.persons.push(person));
    },
    createPerson: (infects, residentState) => {
      set((state) => {
        const machine = createPersonMachine(infects, residentState);
        state.persons.push(machine);
      });
    },
    takeTurn: () => {},
  }))
);

export default useViralStore;
