import create from 'zustand';
import { PersonMachine } from './viral/person.machine';

type State = {
  persons: Array<PersonMachine>;
  addPerson: () => void;
  takeTurn: () => void;
};

const useViralStore = create<State>((set) => ({
  persons: [],
  addPerson: () => {},
  takeTurn: () => {},
}));

export default useViralStore;
