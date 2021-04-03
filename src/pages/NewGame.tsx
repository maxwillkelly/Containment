import React from 'react';
import GameWindow from '../components/shared/GameWindow';
import WindowLink from '../components/shared/WindowLink';

const Footer: React.FC = () => (
  <>
    <WindowLink title="Start" path="/game" />
    <WindowLink title="Cancel" path="/" />
  </>
);

const NewGame: React.FC = () => (
  <GameWindow title="New game" footer={<Footer />} />
);

export default NewGame;
