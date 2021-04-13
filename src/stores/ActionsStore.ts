import create from 'zustand';
import immer from './shared/immer';
import { Action } from '../data/actions';

type State = {
  active: Action[];
  inActive: Action[];

  startAction: (action: Action) => void;
  cancelAction: (action: Action) => void;

  reset: () => void;
};

const useActionsMenuStore = create<State>(
  immer((set, get) => ({
    active: [],
    inActive: [],

    startAction: (action) => {
      const { inActive } = get();
      const index = inActive.findIndex((a) => a.id === action.id);

      set((state) => {
        state.inActive.splice(index, 1);
        state.active.push(action);
      });
    },

    cancelAction: (action) => {
      const { active } = get();
      const index = active.findIndex((a) => a.id === action.id);

      set((state) => {
        state.active.splice(index, 1);
        state.inActive.push(action);
      });
    },

    reset: () => set(() => ({})),
  }))
);

export default useActionsMenuStore;
