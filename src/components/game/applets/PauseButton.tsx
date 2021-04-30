import React from 'react';
import { GiPauseButton } from 'react-icons/gi';
import useGameStore from '../../../stores/GameStore';
import { getBgColour } from './shared';

const PauseButton: React.FC = () => {
  const isPaused = useGameStore((state) => state.isPaused);
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <button
      className={`p-3 ${getBgColour(isPaused)}`}
      type="button"
      onClick={() => togglePause()}
    >
      <GiPauseButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

export default PauseButton;
