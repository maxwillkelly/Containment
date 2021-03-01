import React from 'react';
import useGameStore from '../stores/GameStore';

import TopBar from '../components/game/TopBar';
import PauseMenu from '../components/game/PauseMenu';

const Game: React.FC = () => {
  const paused = useGameStore((state) => state.isPaused);

  return (
    <>
      <div className={paused ? 'shadow-2xl' : ''}>
        <TopBar />
        <pre>{paused}</pre>
      </div>
      {paused && <PauseMenu />}
    </>
  );
};

export default Game;
