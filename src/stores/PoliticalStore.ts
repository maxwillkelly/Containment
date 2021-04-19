import lodash from 'lodash';
import create from 'zustand';
import { actions, Action } from '../data/actions';
import { getHighestValueKey } from '../libs/object';
import immer from './shared/immer';

type State = {
  base: number;
  actionModifiers: Record<number, Record<string, number>>;

  getPopularity: (turn: number) => number;

  addActionModifier: (action: Action, turn: number) => void;
  editActionModifier: (action: Action, turn: number) => void;
  removeActionModifier: (action: Action, turn: number) => void;

  advanceTurn: () => void;

  reset: () => void;
};

const usePoliticalStore = create<State>(
  immer((set, get) => ({
    base: 0.55,
    actionModifiers: {},

    getPopularity: (turn) => {
      const { base, actionModifiers } = get();
      const turnActionModifiers = Object.values(actionModifiers[turn]);

      const popularity = turnActionModifiers.reduce(
        (curr, am) => curr + am,
        base
      );

      return popularity;
    },

    addActionModifier: (action, turn) => {
      const { id, graduationPercentage, impact } = action;

      if (graduationPercentage === undefined) return;

      const modifier = impact.popularity(graduationPercentage);

      set((state) => {
        state.actionModifiers[turn + 1][id] = modifier;
      });
    },

    editActionModifier: (action, turn) => get().addActionModifier(action, turn),

    removeActionModifier: (action, turn) =>
      set((state) => {
        delete state.actionModifiers[turn + 1][action.id];
      }),

    advanceTurn: () => {
      const { actionModifiers } = get();
      const turn = getHighestValueKey(actionModifiers);

      set((state) => {
        state.actionModifiers[turn + 1] = lodash.cloneDeep(
          state.actionModifiers[turn]
        );
      });
    },

    reset: () => {
      const enabledActions = actions.filter((a) => a.enabledByDefault);
      const initialModifiers: Record<string, number> = {};

      enabledActions.forEach((action) => {
        initialModifiers[action.id] = action.impact.popularity(0.5);
      });

      set((state) => {
        state.actionModifiers = { 0: initialModifiers, 1: initialModifiers };
      });
    },
  }))
);

export default usePoliticalStore;
