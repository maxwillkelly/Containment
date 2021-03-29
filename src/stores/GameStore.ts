import create from 'zustand';

type State = {
  turn: number;
  isActionDrawerOpen: boolean;
  isMapDrawerOpen: boolean;
  isPaused: boolean;
  activeApplet: string;
  advanceTurn: () => void;
  toggleActionDrawer: () => void;
  toggleMapDrawer: () => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string) => void;
};

const useGameStore = create<State>((set) => ({
  turn: 0,
  isPaused: false,
  isActionDrawerOpen: false,
  isMapDrawerOpen: false,
  activeApplet: '',
  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),
  toggleActionDrawer: () =>
    set((state) => ({ isActionDrawerOpen: !state.isActionDrawerOpen })),
  toggleMapDrawer: () =>
    set((state) => ({ isMapDrawerOpen: !state.isMapDrawerOpen })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleActiveApplet: (applet) =>
    set((state) =>
      state.activeApplet === applet
        ? { activeApplet: '' }
        : { activeApplet: applet }
    ),
}));

export default useGameStore;
