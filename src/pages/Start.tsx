import React from 'react';
import MenuItem from '../components/shared/MenuItem';

const Start: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full">
        <h1 className="py-12 text-5xl font-bold dark:text-gray-200 text-center">
          Containment
        </h1>
        <MenuItem name="New Game" path="/game" />
        <MenuItem name="Load Game" path="/" />
        <MenuItem name="Settings" path="/settings" />
        <MenuItem name="Exit" />
      </div>
    </div>
  );
};

export default Start;
