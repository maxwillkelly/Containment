import create from 'zustand';
import immer from './shared/immer';
import { PersonMachine } from './viral/person.machine';

type State = {
  persons: Array<PersonMachine>;
  addPerson: (person: PersonMachine) => void;
  takeTurn: () => void;
};

const useViralStore = create<State>(
  immer((set) => ({
    persons: [],
    addPerson: (person) => {
      set((state) => state.persons.push(person));
    },
    takeTurn: () => {},
  }))
);

export default useViralStore;
