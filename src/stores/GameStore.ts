import create from 'zustand';

type State = {
  isPaused: boolean;
  togglePause: () => void;
};

const useGameStore = create<State>((set) => ({
  isPaused: false,
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
}));

export default useGameStore;
