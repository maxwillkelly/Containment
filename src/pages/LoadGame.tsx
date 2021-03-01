import React from 'react';
import { Link } from 'react-router-dom';

const LoadGame = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full">
        <h1 className="py-12 text-5xl font-bold dark:text-gray-200 text-center">
          Load game
        </h1>
        <Link className="dark:text-gray-200 p-5 m-3" to="/">
          Back
        </Link>
      </div>
    </div>
  );
};

export default LoadGame;
