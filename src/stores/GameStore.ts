import create from 'zustand';
import { Action } from '../data/actions';

type State = {
  turn: number;
  loading: boolean;
  isPaused: boolean;
  activeApplet: string;
  shownAction: Action | undefined;

  advanceTurn: () => void;
  setLoading: (value: boolean) => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string, open?: boolean) => void;
  toggleShownAction: (action: Action, open?: boolean) => void;

  reset: () => void;
};

const useGameStore = create<State>((set, get) => ({
  turn: 0,
  loading: true,
  isPaused: true,
  activeApplet: '',
  shownAction: undefined,

  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),

  setLoading: (value) => set(() => ({ loading: value })),

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
      activeApplet: '',
    }),
}));

export default useGameStore;
