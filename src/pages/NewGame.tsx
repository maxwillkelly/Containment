import React from 'react';
import { Link } from 'react-router-dom';

const NewGame = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full">
        <h1 className="py-12 text-5xl font-bold dark:text-gray-200 text-center">
          New game
        </h1>
        <Link className="dark:text-gray-200 p-5 m-3" to="/">
          Back
        </Link>
        <Link className="dark:text-gray-200 p-5 m-3" to="/game">
          To Game
        </Link>
      </div>
    </div>
  );
};

export default NewGame;
