import create from 'zustand';
import { Vaccine } from './VaccineStore';

type State = {
  ordersChange: number;
  vaccineSelected: Vaccine | null;

  setOrdersChange: (ordersChange: number) => void;
  setVaccineSelected: (vaccineSelected: Vaccine | null) => void;

  reset: () => void;
};

const useVaccineMenuStore = create<State>((set) => ({
  ordersChange: 0,
  vaccineSelected: null,

  setOrdersChange: (ordersChange) =>
    ordersChange >= 0 && set(() => ({ ordersChange })),

  setVaccineSelected: (vaccineSelected) =>
    set(() => set({ vaccineSelected, ordersChange: 0 })),

  reset: () =>
    set(() => ({
      ordersChange: 0,
      vaccineSelected: null,
    })),
}));

export default useVaccineMenuStore;
