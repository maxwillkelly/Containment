import create from 'zustand';

type ResidentStateDetails = {
  fid: number;
  abbreviation: number;
  name: string;
  population: number;
};

type State = {
  isActionDrawerOpen: boolean;
  isMapDrawerOpen: boolean;
  selectedState: ResidentStateDetails | undefined;

  toggleActionDrawer: () => void;
  toggleMapDrawer: (open?: boolean) => void;
  selectState: (selectedState?: ResidentStateDetails) => void;
  reset: () => void;
};

const useMapStore = create<State>((set) => ({
  isActionDrawerOpen: false,
  isMapDrawerOpen: false,
  selectedState: undefined,

  toggleActionDrawer: () =>
    set((state) => ({ isActionDrawerOpen: !state.isActionDrawerOpen })),

  toggleMapDrawer: (open?: boolean) =>
    set((state) => ({
      isMapDrawerOpen: open === undefined ? !state.isMapDrawerOpen : open,
    })),

  selectState: (selectedState) => set(() => ({ selectedState })),

  reset: () =>
    set({
      isActionDrawerOpen: false,
      isMapDrawerOpen: false,
      selectedState: undefined,
    }),
}));

export default useMapStore;
