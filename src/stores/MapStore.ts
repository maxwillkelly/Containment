import create from 'zustand';

type ResidentStateDetails = {
  fid: number;
  abbreviation: number;
  name: string;
  population: number;
};

type State = {
  isPolicyDrawerOpen: boolean;
  isMapDrawerOpen: boolean;
  selectedState: ResidentStateDetails | undefined;

  togglePolicyDrawer: () => void;
  toggleMapDrawer: (open?: boolean) => void;
  selectState: (selectedState?: ResidentStateDetails) => void;
  reset: () => void;
};

const useMapStore = create<State>((set) => ({
  isPolicyDrawerOpen: false,
  isMapDrawerOpen: false,
  selectedState: undefined,

  togglePolicyDrawer: () =>
    set((state) => ({ isPolicyDrawerOpen: !state.isPolicyDrawerOpen })),

  toggleMapDrawer: (open?: boolean) =>
    set((state) => ({
      isMapDrawerOpen: open === undefined ? !state.isMapDrawerOpen : open,
    })),

  selectState: (selectedState) => set(() => ({ selectedState })),

  reset: () =>
    set({
      isPolicyDrawerOpen: false,
      isMapDrawerOpen: false,
      selectedState: undefined,
    }),
}));

export default useMapStore;
