import create from 'zustand';

type State = {
  turn: number;
  isActionDrawerOpen: boolean;
  isMapDrawerOpen: boolean;
  selectedState: string;
  isPaused: boolean;
  activeApplet: string;

  advanceTurn: () => void;
  toggleActionDrawer: () => void;
  toggleMapDrawer: (open?: boolean) => void;
  selectState: (selectedState: string) => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string) => void;
};

const useGameStore = create<State>((set) => ({
  turn: 0,
  isPaused: false,
  isActionDrawerOpen: false,
  isMapDrawerOpen: false,
  selectedState: '',
  activeApplet: '',

  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),

  toggleActionDrawer: () =>
    set((state) => ({ isActionDrawerOpen: !state.isActionDrawerOpen })),

  toggleMapDrawer: (open?: boolean) =>
    set((state) => ({
      isMapDrawerOpen: open === undefined ? !state.isMapDrawerOpen : open,
    })),

  selectState: (selectedState) => set(() => ({ selectedState })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  toggleActiveApplet: (applet) =>
    set((state) =>
      state.activeApplet === applet
        ? { activeApplet: '' }
        : { activeApplet: applet }
    ),
}));

export default useGameStore;
