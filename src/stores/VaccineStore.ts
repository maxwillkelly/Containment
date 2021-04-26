import create from 'zustand';
import immer from './shared/immer';
import { VaccineState } from './vaccine/vaccine.machine';

type Vaccine = {
  machine: VaccineState;
  turnApproved: number;
  production: (turnApproved: number) => number;
};

type State = {
  vaccines: Vaccine[];

  advanceTurn: () => void;
  reset: () => void;
};

const useVaccineStore = create<State>(
  immer((set, get) => ({
    vaccines: [],

    advanceTurn: () => {},
    reset: () => {},
  }))
);

export default useVaccineStore;
