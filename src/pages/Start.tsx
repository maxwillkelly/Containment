import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  name: string;
  path?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, path }) => {
  return (
    <div className="w-full p-5 text-2xl shadow-2xl dark:bg-gray-700 dark:text-gray-200 my-4 text-center">
      {path ? (
        <Link to={path}>{name}</Link>
      ) : (
        <button type="button">{name}</button>
      )}
    </div>
  );
};

const Start: React.FC = () => {
  return (
    <div className="h-screen w-screen px-32 py-36">
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
