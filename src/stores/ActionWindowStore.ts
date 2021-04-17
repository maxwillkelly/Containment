import create from 'zustand';
import { Action } from '../data/actions';

type Graduation = {
  totalSteps?: number;
  currentSteps?: number;
  percentage?: number;
};

type State = {
  graduation: Graduation;
  initialiseGraduation: (action: Action | undefined) => void;
  setGraduation: (currentSteps: number) => void;
  reset: () => void;
};

const useActionWindowStore = create<State>((set, get) => ({
  graduation: {},

  initialiseGraduation: (action) => {
    if (!action) return;

    const { range } = action;
    const { step, lowest, highest } = range;

    const rawRange = highest - lowest;
    const totalSteps = rawRange / step;

    const currentSteps = Math.round(totalSteps / 2);
    const percentage = currentSteps / totalSteps;
    set({ graduation: { totalSteps, currentSteps, percentage } });
  },

  setGraduation: (currentSteps) => {
    const { graduation } = get();
    const { totalSteps } = graduation;

    if (!totalSteps) return;

    const percentage = currentSteps / totalSteps;
    set({ graduation: { currentSteps, totalSteps, percentage } });
  },

  reset: () =>
    set({
      graduation: {},
    }),
}));

export default useActionWindowStore;
