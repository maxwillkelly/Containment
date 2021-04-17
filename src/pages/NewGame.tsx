import React from 'react';
import { useHistory } from 'react-router-dom';

import GameWindow from '../components/shared/GameWindow';
import WindowButton from '../components/shared/WindowButton';

import useActionsStore from '../stores/ActionsStore';
import useGameStore from '../stores/GameStore';
import useMapStore from '../stores/MapStore';
import useViralStore from '../stores/ViralStore';

const Footer: React.FC = () => {
  const history = useHistory();

  const resetActionsStore = useActionsStore((state) => state.reset);
  const resetGameStore = useGameStore((state) => state.reset);
  const resetMapStore = useMapStore((state) => state.reset);
  const resetViralStore = useViralStore((state) => state.reset);

  const handleStart = () => {
    resetActionsStore();
    resetGameStore();
    resetMapStore();
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
