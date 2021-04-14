import create from 'zustand';

type State = {
  turn: number;
  loading: boolean;
  isPaused: boolean;
  activeApplet: string;

  advanceTurn: () => void;
  setLoading: (value: boolean) => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string, open?: boolean) => void;
  reset: () => void;
};

const useGameStore = create<State>((set, get) => ({
  turn: 0,
  loading: true,
  isPaused: true,
  activeApplet: '',

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

  reset: () =>
    set({
      turn: 0,
      loading: true,
      isPaused: false,
      activeApplet: '',
    }),
}));

export default useGameStore;
