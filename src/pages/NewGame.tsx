import React from 'react';
import { useHistory } from 'react-router-dom';

import GameWindow from '../components/shared/GameWindow';
import WindowButton from '../components/shared/WindowButton';

import useActionsStore from '../stores/ActionsStore';
import useBudgetStore from '../stores/BudgetStore';
import useGameStore from '../stores/GameStore';
import useMapStore from '../stores/MapStore';
import usePoliticalStore from '../stores/PoliticalStore';
import useVaccineStore from '../stores/VaccineStore';
import useViralStore from '../stores/ViralStore';

const Footer: React.FC = () => {
  const history = useHistory();

  const resetActionsStore = useActionsStore((state) => state.reset);
  const resetBudgetStore = useBudgetStore((state) => state.reset);
  const resetGameStore = useGameStore((state) => state.reset);
  const resetMapStore = useMapStore((state) => state.reset);
  const resetPoliticalStore = usePoliticalStore((state) => state.reset);
  const resetVaccineStore = useVaccineStore((state) => state.reset);
  const resetViralStore = useViralStore((state) => state.reset);

  const handleStart = () => {
    resetActionsStore();
    resetBudgetStore();
    resetGameStore();
    resetMapStore();
    resetPoliticalStore();
    resetVaccineStore();
    resetViralStore();
    history.push('/game');
  };

  return (
    <>
      <WindowButton title="Start" handleClick={handleStart} />
      <WindowButton title="Cancel" handleClick={() => history.push('/')} />
    </>
  );
};

const NewGame: React.FC = () => {
  return <GameWindow title="New game" footer={<Footer />} />;
};

export default NewGame;
