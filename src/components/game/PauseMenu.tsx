import React from 'react';
import useGameStore from '../../stores/GameStore';
import MenuItem from '../shared/MenuItem';

const PauseMenu: React.FC = () => {
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <div className="h-screen w-screen fixed block top-0 left-0 z-50">
      <div className="flex items-center justify-center h-full w-full blur">
        <div className="px-5 py-14 w-9/12 rounded border dark:border-gray-300 dark:bg-gray-800 dark:text-gray-200">
          <h1 className="text-4xl font-bold text-center mb-5 mx-3">Paused</h1>
          <MenuItem name="Return to Game" handleClick={() => togglePause()} />
          <MenuItem name="Exit to Main Menu" path="/" />
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;
