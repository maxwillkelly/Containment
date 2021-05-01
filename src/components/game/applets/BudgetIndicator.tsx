import React from 'react';
import { formatCurrency } from '../../../libs/numeral';

import useBudgetStore from '../../../stores/BudgetStore';
import useGameStore from '../../../stores/GameStore';

import { getBgColour } from './shared';

const BudgetIndicator: React.FC = () => {
  const applet = 'BudgetIndicator';

  const turn = useGameStore((state) => state.turn);
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  const getBudgetDetails = useBudgetStore((state) => state.getBudgetDetails);

  const budgetDetails = getBudgetDetails(turn);
  const { absoluteDifference, inDebt } = budgetDetails;

  const difference = formatCurrency(absoluteDifference);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">{difference}</h3>
      <h6 className="text-xs">{inDebt ? 'Deficit' : 'Surplus'}</h6>
    </button>
  );
};

export default BudgetIndicator;
