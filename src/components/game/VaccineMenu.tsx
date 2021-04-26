import React from 'react';
import useGameStore from '../../stores/GameStore';
import GameWindow from '../shared/GameWindow';
import WindowButton from '../shared/WindowButton';

const Footer: React.FC = () => {
  const applet = 'VaccinesButton';
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  const handleClose = () => toggleActiveApplet(applet, false);

  const handleSave = () => {
    handleClose();
  };

  return (
    <>
      <WindowButton title="Save" handleClick={handleSave} />
      <WindowButton title="Cancel" handleClick={handleClose} />
    </>
  );
};

const VaccineMenu = () => {
  return (
    <div className="z-20">
      <GameWindow title="Vaccine Menu" footer={<Footer />} />
    </div>
  );
};

export default VaccineMenu;
