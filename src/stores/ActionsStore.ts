import create from 'zustand';
import lodash from 'lodash';
import immer from './shared/immer';
import { actions, Action } from '../data/actions';

const POINTS_START = 30;
const POINTS_MAX = 40;
const POINTS_PER_TURN = 10;

type State = {
  points: number;
  active: Action[];
  inActive: Action[];

  startAction: (actionParameter: Action, graduationPercentage: number) => void;
  editAction: (actionParameter: Action, graduationPercentage: number) => void;
  cancelAction: (actionParameter: Action) => void;

  decrementPoints: (pointsDecrement: number) => void;
  takeTurn: () => void;

  reset: () => void;
};

const useActionsStore = create<State>(
  immer((set, get) => ({
    points: POINTS_START,
    active: [],
    inActive: [],

    startAction: (actionParameter, graduationPercentage) => {
      const action = lodash.cloneDeep(actionParameter);
      action.graduationPercentage = graduationPercentage;

      const { inActive } = get();
      const index = inActive.findIndex((a) => a.id === action.id);

      set((state) => {
        state.inActive.splice(index, 1);
        state.active.push(action);
      });
    },

    editAction: (actionParameter, graduationPercentage) => {
      const action = lodash.cloneDeep(actionParameter);
      action.graduationPercentage = graduationPercentage;

      const { active } = get();
      const index = active.findIndex((a) => a.id === action.id);

      set((state) => {
        state.active.splice(index, 1);
        state.active.push(action);
      });
    },

    cancelAction: (actionParameter) => {
      const action = lodash.cloneDeep(actionParameter);
      action.graduationPercentage = undefined;

      const { active } = get();
      const index = active.findIndex((a) => a.id === action.id);

      set((state) => {
        state.active.splice(index, 1);
        state.inActive.push(action);
      });
    },

    decrementPoints: (pointsDecrement) =>
      set((state) => {
        state.points -= pointsDecrement;
      }),

    takeTurn: () =>
      set((state) => {
        const points = Math.min(state.points + POINTS_PER_TURN, POINTS_MAX);

        state.points = points;
      }),

    reset: () => {
      set((state) => {
        state.points = POINTS_START;
        state.active = actions.filter((a) => a.enabledByDefault);
        state.inActive = actions.filter((a) => !a.enabledByDefault);
      });
    },
  }))
);

export default useActionsStore;
