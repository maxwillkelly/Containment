import React from 'react';
// import { Link } from 'react-router-dom';
import { GiPauseButton, GiStoneCrafting } from 'react-icons/gi';
import useGameStore from '../../stores/GameStore';

const PauseButton: React.FC = () => {
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <button className="shadow p-3" type="button" onClick={() => togglePause()}>
      <GiPauseButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ActionsButton: React.FC = () => {
  return (
    <button
      className="flex items-center justify-items-center shadow p-3"
      type="button"
    >
      <GiStoneCrafting className="dark:text-gray-200 text-3xl" />
      <h3 className="text-xl ml-2">27</h3>
    </button>
  );
};

const NationalApproval: React.FC = () => {
  return (
    <button className="shadow px-3" type="button">
      <h3 className="text-lg">55%</h3>
      <h6 className="text-xs">National Approval</h6>
    </button>
  );
};

const BudgetIndicator: React.FC = () => {
  return (
    <button className="shadow px-3" type="button">
      <h3 className="text-lg">£1,136.07 Bn</h3>
      <h6 className="text-xs">Deficit</h6>
    </button>
  );
};

const ReproductionIndicator: React.FC = () => {
  return (
    <button className="shadow px-3" type="button">
      <h3 className="text-lg">1.5</h3>
      <h6 className="text-xs">R</h6>
    </button>
  );
};

const TopBar: React.FC = () => {
  return (
    <nav className="mx-auto dark:bg-gray-700 dark:text-gray-200">
      <div className="flex flex-row justify-between">
        <PauseButton />
        <ActionsButton />
        <NationalApproval />
        <BudgetIndicator />
        <div className="mr-auto" />
      </div>
    </nav>
  );
};

export default TopBar;
