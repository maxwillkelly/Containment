import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/game/TopBar';

const Game: React.FC = () => {
  return (
    <div>
      <TopBar />
      <Link className="m-5" to="/">
        Back to Main Menu
      </Link>
    </div>
  );
};

export default Game;
