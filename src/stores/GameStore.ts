import create from 'zustand';

type State = {
  isPaused: boolean;
  activeApplet: string;
  togglePause: () => void;
  toggleActiveApplet: (applet: string) => void;
};

const useGameStore = create<State>((set) => ({
  isPaused: false,
  activeApplet: '',
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleActiveApplet: (applet) =>
    set((state) =>
      state.activeApplet === applet
        ? { activeApplet: '' }
        : { activeApplet: applet }
    ),
}));

export default useGameStore;
