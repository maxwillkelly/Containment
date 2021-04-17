import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuItem from '../components/shared/MenuItem';

const Start: React.FC = () => {
  const history = useHistory();

  return (
    <div className="h-screen w-screen">
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-9/12 mb-12">
          <h1 className="pb-9 text-5xl font-bold dark:text-gray-200 text-center">
            Containment
          </h1>
          <MenuItem
            name="New Game"
            handleClick={() => history.push('/new-game')}
          />
          <MenuItem
            name="Load Game"
            handleClick={() => history.push('/load-game')}
            disabled
          />
          <MenuItem
            name="Settings"
            handleClick={() => history.push('/settings')}
            disabled
          />
          <MenuItem name="Exit" handleClick={() => window.close()} />
        </div>
      </div>
    </div>
  );
};

export default Start;
