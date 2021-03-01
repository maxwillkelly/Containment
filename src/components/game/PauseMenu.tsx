import React from 'react';
import useGameStore from '../../stores/GameStore';

const PauseMenu: React.FC = () => {
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <div>
      <h1>Paused</h1>
      <button type="button" onClick={() => togglePause()}>
        Unpause
      </button>
    </div>
  );
};

export default PauseMenu;
