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
  const { name, price, orders, received } = vaccine;

  const formattedPrice = formatCurrency(price);
  const formattedOrders = formatNumber(orders);
  const formattedReceived = formatNumber(received);

  return (
    <div className="flex flex-row items-center p-2 rounded-lg text-left text-white hover:bg-gray-600 w-full h-16">
      <p className="pl-2">{name}</p>
      <p className="pl-2">{formattedPrice}</p>
      <p className="pl-2">{formattedOrders}</p>
      <p className="pl-2">{formattedReceived}</p>
    </div>
  );
};

const VaccineList: React.FC = () => {
  const vaccines = useVaccineStore((state) => state.vaccines);

  return (
    <div className="grid grid-flow-row items-center mx-4 my-2">
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
