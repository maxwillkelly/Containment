import create from 'zustand';
import { PersonMachine } from './viral/person.machine';

type State = {
  persons: Array<PersonMachine>;
  takeTurn: () => void;
};

const useViralStore = create<State>((set) => ({
  persons: [],
  takeTurn: () => {},
}));

export default useViralStore;
