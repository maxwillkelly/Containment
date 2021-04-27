import React, { useState } from 'react';
import { formatCurrency, formatNumber } from '../../libs/numeral';
import useGameStore from '../../stores/GameStore';
import useVaccineMenuStore from '../../stores/VaccineMenuStore';
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

const VaccineOrdersFooter: React.FC = () => {
  const setVaccineSelected = useVaccineMenuStore(
    (state) => state.setVaccineSelected
  );

  const handleClose = () => setVaccineSelected(null);

  const handleSave = () => {};

  return (
    <>
      <WindowButton title="Save" handleClick={handleSave} />
      <WindowButton title="Cancel" handleClick={handleClose} />
    </>
  );
};

const VaccineOrders: React.FC = () => {
  const vaccineSelected = useVaccineMenuStore((state) => state.vaccineSelected);
  const ordersChange = useVaccineMenuStore((state) => state.ordersChange);
  const setOrdersChange = useVaccineMenuStore((state) => state.setOrdersChange);

  if (!vaccineSelected) return null;

  const newOrders = vaccineSelected.orders + ordersChange;

  return (
    <div className="z-30">
      <GameWindow
        title={`${vaccineSelected.name} Vaccine`}
        footer={<VaccineOrdersFooter />}
      >
        <button type="button" onClick={() => setOrdersChange(100000)}>
          +
        </button>
        <p>{newOrders}</p>
        <button type="button" onClick={() => setOrdersChange(-100000)}>
          -
        </button>
      </GameWindow>
    </div>
  );
};

interface VaccineProp {
  vaccine: Vaccine;
}

const VaccineItem: React.FC<VaccineProp> = ({ vaccine }) => {
  const getPhaseString = useVaccineStore((state) => state.getPhaseString);
  const setVaccineSelected = useVaccineMenuStore(
    (state) => state.setVaccineSelected
  );

  const { name, price, orders, received } = vaccine;

  const formattedPrice = formatCurrency(price);
  const formattedOrders = formatNumber(orders);
  const formattedReceived = formatNumber(received);
  const phase = getPhaseString(vaccine);

  return (
    <button
      // className="w-16 h-10 text-base dark:disabled:bg-disabled dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200"
      type="button"
      onClick={() => setVaccineSelected(vaccine)}
      disabled={phase === 'Failed'}
    >
      <div className="grid grid-cols-5 text-white place-items-center rounded-lg hover:bg-gray-600 py-5 px-2 w-full">
        <p className="text-left">{name}</p>
        <p>{formattedPrice}</p>
        <p>{formattedOrders}</p>
        <p>{formattedReceived}</p>
        <p>{phase}</p>
      </div>
    </button>
  );
};

const VaccineListHeaders: React.FC = () => (
  <div className="grid grid-cols-5 text-white place-items-center py-3 px-2 w-full">
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

const VaccineMenu: React.FC = () => (
  <>
    <div className="z-20">
      <GameWindow title="Vaccine Menu" footer={<Footer />}>
        <VaccineList />
      </GameWindow>
    </div>
    <div className="z-30">
      <VaccineOrders />
    </div>
  </>
);

export default VaccineMenu;
