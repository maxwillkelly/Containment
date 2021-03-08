import React from 'react';
import useGameStore from '../stores/GameStore';

import TopBar from '../components/game/TopBar';
import Map from '../components/game/Map';
import PauseMenu from '../components/game/PauseMenu';

const Game: React.FC = () => {
  const paused = useGameStore((state) => state.isPaused);

  return (
    <div className="h-screen w-screen flex flex-col">
      <TopBar />
      <main className="relative flex-1">
        <Map />
        {paused && <PauseMenu />}
      </main>
    </div>
  );
};

export default Game;
