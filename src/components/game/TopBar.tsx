import React from 'react';
// import { Link } from 'react-router-dom';
import { GiPauseButton } from 'react-icons/gi';
import useGameStore from '../../stores/GameStore';

const PauseButton: React.FC = () => {
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <button className="p-3" type="button" onClick={() => togglePause()}>
      {/* <Link className="p-3" to="/"> */}
      <GiPauseButton className="text-2xl" />
      {/* </Link> */}
    </button>
  );
};

const TopBar: React.FC = () => {
  return (
    <nav className="mx-auto dark:bg-gray-700 dark:text-gray-200">
      <div className="flex flex-row justify-between">
        <PauseButton />
        <h1>Y</h1>
      </div>
    </nav>
  );
};

export default TopBar;
