import React from 'react';
import useGameStore from '../../stores/GameStore';
import useVaccineStore, { Vaccine } from '../../stores/VaccineStore';
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

interface VaccineItemProps {
  vaccine: Vaccine;
}

const VaccineItem: React.FC<VaccineItemProps> = ({ vaccine }) => {
  const { name } = vaccine;

  return (
    <div className="flex flex-row items-center p-2 rounded-lg text-left">
      <p>{name}</p>
    </div>
  );
};

const VaccineList: React.FC = () => {
  const vaccines = useVaccineStore((state) => state.vaccines);

  return (
    <div className="grid grid-flow-col items-center h-full">
      {vaccines.map((v) => {
        return <VaccineItem vaccine={v} key={v.id} />;
      })}
    </div>
  );
};

const VaccineMenu: React.FC = () => {
  return (
    <div className="z-20">
      <GameWindow title="Vaccine Menu" footer={<Footer />}>
        <VaccineList />
      </GameWindow>
    </div>
  );
};

export default VaccineMenu;
