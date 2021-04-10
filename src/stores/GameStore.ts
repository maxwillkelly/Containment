import create from 'zustand';

type State = {
  turn: number;
  loading: boolean;
  isPaused: boolean;
  activeApplet: string;

  advanceTurn: () => void;
  setLoading: (value: boolean) => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string) => void;
  reset: () => void;
};

const useGameStore = create<State>((set) => ({
  turn: 0,
  loading: true,
  isPaused: true,
  activeApplet: '',

  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),

  setLoading: (value) => set(() => ({ loading: value })),

  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  toggleActiveApplet: (applet) =>
    set((state) =>
      state.activeApplet === applet
        ? { activeApplet: '' }
        : { activeApplet: applet }
    ),

  reset: () =>
    set({
      turn: 0,
      loading: true,
      isPaused: false,
      activeApplet: '',
    }),
}));

export default useGameStore;
