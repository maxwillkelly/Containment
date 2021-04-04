import React from 'react';
import { useHistory } from 'react-router-dom';

import GameWindow from '../components/shared/GameWindow';
import WindowButton from '../components/shared/WindowButton';
import WindowLink from '../components/shared/WindowLink';
import useGameStore from '../stores/GameStore';

const Footer: React.FC = () => {
  const history = useHistory();
  const togglePause = useGameStore((state) => state.togglePause);

  const handleStart = () => {
    togglePause();
    history.push('/game');
  };

  return (
    <>
      <WindowButton title="Start" handleClick={handleStart} />
      <WindowLink title="Cancel" path="/" />
    </>
  );
};

const NewGame: React.FC = () => {
  return <GameWindow title="New game" footer={<Footer />} />;
};

export default NewGame;
