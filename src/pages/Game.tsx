import React from 'react';
import { Link } from 'react-router-dom';

const Game: React.FC = () => {
  return (
    <div>
      <h1>Game</h1>
      <Link to="/">Back to Main Menu</Link>
    </div>
  );
};

export default Game;
