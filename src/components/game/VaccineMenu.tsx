import React from 'react';
import { formatCurrency, formatNumber } from '../../libs/numeral';
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
  const getPhaseString = useVaccineStore((state) => state.getPhaseString);

  const { name, price, orders, received } = vaccine;

  const formattedPrice = formatCurrency(price);
  const formattedOrders = formatNumber(orders);
  const formattedReceived = formatNumber(received);
  const phase = getPhaseString(vaccine);

  return (
    <div className="grid grid-cols-5 text-white text-center rounded-lg hover:bg-gray-600 py-5 px-2 w-full">
      <p className="text-left">{name}</p>
      <p>{formattedPrice}</p>
      <p>{formattedOrders}</p>
      <p>{formattedReceived}</p>
      <p>{phase}</p>
    </div>
  );
};

const VaccineListHeaders: React.FC = () => (
  <div className="grid grid-cols-5 text-white text-center py-3 px-2 w-full">
    <p className="text-left">Name</p>
    <p>Cost</p>
    <p>Orders</p>
    <p>Received</p>
    <p>Phase</p>
  </div>
);

const VaccineList: React.FC = () => {
  const vaccines = useVaccineStore((state) => state.vaccines);

  return (
    <div className="h-full mx-4 my-2 overflow-scroll">
      <VaccineListHeaders />
      <div className="grid grid-flow-row">
        {vaccines.map((v) => (
          <VaccineItem vaccine={v} key={v.id} />
        ))}
      </div>
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
