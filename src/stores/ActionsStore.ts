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

  isActionActive: (action: Action) => boolean;

  isActionStartable: (action: Action) => boolean;
  isActionEditable: (action: Action, graduationPercentage: number) => boolean;
  isActionCancelable: (action: Action) => boolean;

  startAction: (actionParameter: Action, graduationPercentage: number) => void;

  calcEditDeduction: (action: Action, graduationPercentage: number) => number;
  editAction: (actionParameter: Action, graduationPercentage: number) => void;

  cancelAction: (actionParameter: Action) => void;

  advanceTurn: () => void;

  reset: () => void;
};

const useActionsStore = create<State>(
  immer((set, get) => ({
    points: POINTS_START,
    active: [],
    inActive: [],

    isActionActive: (action) => {
      const { active } = get();
      return active.some((a) => a.id === action.id);
    },

    isActionStartable: (action: Action) =>
      action.pointsCost.start <= get().points,

    isActionEditable: (action: Action, graduationPercentage: number) => {
      const pointDeduction = get().calcEditDeduction(
        action,
        graduationPercentage
      );

      return pointDeduction > 0 && pointDeduction <= get().points;
    },

    isActionCancelable: (action: Action) =>
      action.pointsCost.cancel <= get().points,

    startAction: (actionParameter, graduationPercentage) => {
      const action = lodash.cloneDeep(actionParameter);

      action.graduationPercentage = graduationPercentage;

      const { inActive } = get();
      const index = inActive.findIndex((a) => a.id === action.id);

      set((state) => {
        state.points -= action.pointsCost.start;
        state.inActive.splice(index, 1);
        state.active.push(action);
      });
    },

    calcEditDeduction: (action: Action, graduationPercentage: number) => {
      const oldGraduationPercentage = action.graduationPercentage;

      if (oldGraduationPercentage === undefined) return -1;

      const graduationChange = Math.abs(
        oldGraduationPercentage - graduationPercentage
      );

      if (graduationChange === 0) return -2;

      return Math.round(action.pointsCost.modify(graduationChange));
    },

    editAction: (actionParameter, graduationPercentage) => {
      const action = lodash.cloneDeep(actionParameter);
      action.graduationPercentage = graduationPercentage;

      const { active, calcEditDeduction } = get();
      const index = active.findIndex((a) => a.id === action.id);

      const pointDeduction = calcEditDeduction(
        actionParameter,
        graduationPercentage
      );

      set((state) => {
        state.points -= pointDeduction;
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
        state.points -= action.pointsCost.cancel;
        state.active.splice(index, 1);
        state.inActive.push(action);
      });
    },

    advanceTurn: () =>
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
