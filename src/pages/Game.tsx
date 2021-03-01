import React from 'react';
import { useMachine } from '@xstate/react';
import GameMachine from '../machines/GameMachine';

import TopBar from '../components/game/TopBar';
import PauseMenu from '../components/game/PauseMenu';

const Game: React.FC = () => {
  const [current] = useMachine(GameMachine);

  return (
    <>
      <div className={current.matches('pause') ? 'shadow-2xl' : ''}>
        <TopBar />
        <pre>{current.value}</pre>
      </div>
      <PauseMenu />
    </>
  );
};

export default Game;
