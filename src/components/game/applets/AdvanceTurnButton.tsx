import React from 'react';
import { GiPlayButton } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';

import useActionsStore from '../../../stores/ActionsStore';
import useBudgetStore from '../../../stores/BudgetStore';
import useGameStore from '../../../stores/GameStore';
import usePoliticalStore from '../../../stores/PoliticalStore';
import useVaccineStore from '../../../stores/VaccineStore';
import useViralStore from '../../../stores/ViralStore';

import { calculateImmunity } from './shared';

const AdvanceTurnButton: React.FC = () => {
  const history = useHistory();

  const setLoading = useGameStore((state) => state.setLoading);
  const turn = useGameStore((state) => state.turn);
  const getPopularity = usePoliticalStore((state) => state.getPopularity);
  const getViralDetails = useViralStore((state) => state.getViralDetails);
  const getVaccinations = useVaccineStore((state) => state.getVaccinations);

  const takeTurn = useViralStore((state) => state.takeTurn);
  const advanceActionTurn = useActionsStore((state) => state.advanceTurn);
  const advanceBudgetTurn = useBudgetStore((state) => state.advanceTurn);
  const advanceGameTurn = useGameStore((state) => state.advanceTurn);
  const advancePoliticalTurn = usePoliticalStore((state) => state.advanceTurn);
  const advanceVaccineTurn = useVaccineStore((state) => state.advanceTurn);

  const checkFinished = () => {
    const popularity = getPopularity(turn);
    const viralDetails = getViralDetails(turn);
    const immunity = calculateImmunity(viralDetails);

    if (immunity > 80) history.push('/finish/true');
    else if (popularity < 0.4) history.push('/finish/false');
  };

  const handleClick = () => {
    setLoading(true);

    const vaccinations = getVaccinations(turn);
    const nextTurn = turn + 1;

    takeTurn(vaccinations, nextTurn);
    advanceVaccineTurn(nextTurn);

    advanceActionTurn();
    advanceBudgetTurn();
    advanceGameTurn();
    advancePoliticalTurn();

    checkFinished();

    setLoading(false);
  };

  return (
    <button className="px-3" type="button" onClick={handleClick}>
      <GiPlayButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

export default AdvanceTurnButton;
