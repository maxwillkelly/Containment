import create from 'zustand';

type ResidentStateDetails = {
  fid: number;
  abbreviation: number;
  name: string;
  population: number;
};

type State = {
  turn: number;
  loading: boolean;
  isActionDrawerOpen: boolean;
  isMapDrawerOpen: boolean;
  selectedState: ResidentStateDetails | undefined;
  isPaused: boolean;
  activeApplet: string;

  advanceTurn: () => void;
  setLoading: (value: boolean) => void;
  toggleActionDrawer: () => void;
  toggleMapDrawer: (open?: boolean) => void;
  selectState: (selectedState?: ResidentStateDetails) => void;
  togglePause: () => void;
  toggleActiveApplet: (applet: string) => void;
  reset: () => void;
};

const useGameStore = create<State>((set) => ({
  turn: 0,
  loading: true,
  isPaused: true,
  isActionDrawerOpen: false,
  isMapDrawerOpen: false,
  selectedState: undefined,
  activeApplet: '',

  advanceTurn: () => set((state) => ({ turn: state.turn + 1 })),

  setLoading: (value) => set(() => ({ loading: value })),

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

  reset: () =>
    set({
      turn: 0,
      loading: true,
      isPaused: false,
      isActionDrawerOpen: false,
      isMapDrawerOpen: false,
      selectedState: undefined,
      activeApplet: '',
    }),
}));

export default useGameStore;
