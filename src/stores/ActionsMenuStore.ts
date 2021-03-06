import create from 'zustand';

type State = {
  categorySelected: string;
  searchText: string;
  setCategorySelected: (categorySelected: string) => void;
  setSearchText: (searchText: string) => void;
};

const useActionsMenuStore = create<State>((set) => ({
  categorySelected: '',
  searchText: '',
  setCategorySelected: (categorySelected) =>
    set((state) =>
      state.categorySelected === categorySelected
        ? { categorySelected: '' }
        : { categorySelected }
    ),
  setSearchText: (searchText) => set(() => ({ searchText })),
}));

export default useActionsMenuStore;
