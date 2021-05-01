import create from 'zustand';
import { Action } from '../interfaces/action';

type State = {
  turn: number;
  loading: boolean;
  isPaused: boolean;
  isFinished: boolean;
  activeApplet: string;
  shownAction: Action | undefined;

  advanceTurn: () => void;
  setLoading: (value: boolean) => void;
  finish: () => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string, open?: boolean) => void;
  toggleShownAction: (action: Action, open?: boolean) => void;

  reset: () => void;
};

const useGameStore = create<State>((set, get) => ({
  turn: 0,
  loading: true,
  isPaused: true,
  isFinished: false,
  activeApplet: '',
  shownAction: undefined,

  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),

  setLoading: (value) => set(() => ({ loading: value })),

  finish: () => set(() => ({ isFinished: true })),

  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  toggleActiveApplet: (applet, open) => {
    if (open === undefined) {
      set((state) =>
        state.activeApplet === applet
          ? { activeApplet: '' }
          : { activeApplet: applet }
      );
    } else if (open) {
      set(() => ({ activeApplet: applet }));
    } else if (get().activeApplet === applet) {
      set(() => ({ activeApplet: '' }));
    }
  },

  toggleShownAction: (action, open) => {
    const { shownAction } = get();

    if (open === undefined) {
      set((state) =>
        state.shownAction && state.shownAction.id === action.id
          ? { shownAction: undefined }
          : { shownAction: action }
      );
    } else if (open) {
      set(() => ({ shownAction: action }));
    } else if (shownAction && shownAction.id === action.id) {
      set(() => ({ shownAction: undefined }));
    }
  },

  reset: () =>
    set({
      turn: 0,
      loading: true,
      isPaused: false,
      isFinished: false,
      activeApplet: '',
    }),
}));

export default useGameStore;
