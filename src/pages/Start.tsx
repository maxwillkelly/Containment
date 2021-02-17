import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  name: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, path }) => {
  return (
    <div className="w-full p-5 text-4xl text-center">
      <Link to={path}>{name}</Link>
    </div>
  );
};

const Start: React.FC = () => {
  return (
    <div className="h-screen w-screen px-32 py-36">
      <div className="bg-gray-500 h-full w-full">
        <h1 className="py-12 text-5xl text-center">Containment</h1>
        <MenuItem name="New Game" path="/game" />
        <MenuItem name="Load Game" path="/" />
        <MenuItem name="Settings" path="/settings" />
      </div>
    </div>
  );
};

export default Start;
