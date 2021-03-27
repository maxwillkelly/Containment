import create from 'zustand';

type State = {
  turn: number;
  isPaused: boolean;
  activeApplet: string;
  advanceTurn: () => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string) => void;
};

const useGameStore = create<State>((set) => ({
  turn: 0,
  isPaused: false,
  activeApplet: '',
  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleActiveApplet: (applet) =>
    set((state) =>
      state.activeApplet === applet
        ? { activeApplet: '' }
        : { activeApplet: applet }
    ),
}));

export default useGameStore;
