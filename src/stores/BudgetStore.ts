import lodash from 'lodash';
import create from 'zustand';
import { actions, Action } from '../data/actions';
import { getHighestValueKey } from '../libs/object';
import immer from './shared/immer';

const STARTING_CASH = 0;

type BudgetTurn = {
  base: number;
  actionModifiers: Record<string, number>;
};

type BudgetDetails = {
  cash: number;
  income: number;
  expenditure: number;
  absoluteDifference: number;
  inDebt: boolean;
};

type State = {
  budget: Record<number, BudgetTurn>;

  getBudgetDetails: (turn: number) => BudgetDetails;

  addActionModifier: (action: Action, turn: number) => void;
  editActionModifier: (action: Action, turn: number) => void;
  removeActionModifier: (action: Action, turn: number) => void;

  advanceTurn: () => void;

  reset: () => void;
};

const useBudgetStore = create<State>(
  immer((set, get) => ({
    budget: {},

    getBudgetDetails: (turn) => {
      const { budget } = get();
      const budgetTurn = budget[turn];

      const { base, actionModifiers } = budgetTurn;
      const actionModifiersArray = Object.values(actionModifiers);

      const cash = actionModifiersArray.reduce((curr, am) => curr + am, base);

      const income = actionModifiersArray.reduce(
        (curr, am) => (am > 0 ? curr + am : curr),
        base
      );

      const expenditure = actionModifiersArray.reduce(
        (curr, am) => (am < 0 ? curr - am : curr),
        base
      );

      const absoluteDifference = Math.abs(expenditure - income);

      const inDebt = expenditure > income;

      return { cash, income, expenditure, absoluteDifference, inDebt };
    },

    addActionModifier: (action, turn) => {
      const { id, graduationPercentage, impact } = action;

      if (graduationPercentage === undefined) return;

      const modifier = impact.budget(graduationPercentage);

      set((state) => {
        state.budget[turn + 1].actionModifiers[id] = modifier;
      });
    },

    editActionModifier: (action, turn) => get().addActionModifier(action, turn),

    removeActionModifier: (action, turn) =>
      set((state) => {
        delete state.budget[turn + 1].actionModifiers[action.id];
      }),

    advanceTurn: () => {
      const { budget, getBudgetDetails } = get();
      const turn = getHighestValueKey(budget);
      const budgetDetails = getBudgetDetails(turn);

      const { cash, income, expenditure } = budgetDetails;
      const base = cash + income - expenditure;

      const actionModifiers = lodash.cloneDeep(budget[turn].actionModifiers);

      set((state) => {
        state.budget[turn + 1] = { base, actionModifiers };
      });
    },

    reset: () => {
      const enabledActions = actions.filter((a) => a.enabledByDefault);
      const initialModifiers: Record<string, number> = {};

      enabledActions.forEach((action) => {
        initialModifiers[action.id] = action.impact.budget(0.5);
      });

      const initialBudgetTurn = {
        base: STARTING_CASH,
        actionModifiers: initialModifiers,
      };

      set((state) => {
        state.budget = {
          0: initialBudgetTurn,
          1: initialBudgetTurn,
        };
      });
    },
  }))
);

export default useBudgetStore;
