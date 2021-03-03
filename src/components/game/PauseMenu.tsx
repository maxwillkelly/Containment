import React from 'react';
import useGameStore from '../../stores/GameStore';
import MenuItem from '../shared/MenuItem';

const PauseMenu: React.FC = () => {
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <div className="z-10 dark:bg-gray dark:text-gray-200">
      <h1 className="text-2xl text-center my-5 mx-3">Paused</h1>
      <MenuItem name="Exit to Main Menu" path="/" />
      <MenuItem name="Return to Game" handleClick={() => togglePause()} />
    </div>
  );
};

export default PauseMenu;
