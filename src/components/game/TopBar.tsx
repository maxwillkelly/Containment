import React from 'react';
import {
  GiPauseButton,
  GiPlayButton,
  GiPositionMarker,
  GiProgression,
  GiStoneCrafting,
  GiTestTubes,
} from 'react-icons/gi';

import useGameStore from '../../stores/GameStore';

const PauseButton: React.FC = () => {
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <button className="p-3" type="button" onClick={() => togglePause()}>
      <GiPauseButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ActionsButton: React.FC = () => {
  return (
    <button
      className="flex items-center justify-items-center p-3"
      type="button"
    >
      <GiStoneCrafting className="dark:text-gray-200 text-3xl" />
      <h3 className="text-xl ml-2">27</h3>
    </button>
  );
};

const NationalApproval: React.FC = () => {
  return (
    <button className="px-3" type="button">
      <h3 className="text-lg">55%</h3>
      <h6 className="text-xs">National Approval</h6>
    </button>
  );
};

const BudgetIndicator: React.FC = () => {
  return (
    <button className="px-3" type="button">
      <h3 className="text-lg">£1,136.07 Bn</h3>
      <h6 className="text-xs">Deficit</h6>
    </button>
  );
};

const ReproductionIndicator: React.FC = () => {
  return (
    <button className="px-3" type="button">
      <h3 className="text-lg">1.5</h3>
      <h6 className="text-xs">R</h6>
    </button>
  );
};

const MapSettingsButton: React.FC = () => {
  return (
    <button className="p-3" type="button">
      <GiPositionMarker className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ResearchButton: React.FC = () => {
  return (
    <button className="p-3" type="button">
      <GiTestTubes className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const DashboardButton: React.FC = () => {
  return (
    <button className="p-3" type="button">
      <GiProgression className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const AdvanceTurnButton: React.FC = () => {
  return (
    <button className="p-3" type="button">
      <GiPlayButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const TopBar: React.FC = () => {
  return (
    <nav className="mx-auto dark:bg-gray-700 dark:text-gray-200">
      <div className="flex flex-row divide-x dark:divide-gray-900 justify-between shadow">
        <PauseButton />
        <ActionsButton />
        <NationalApproval />
        <BudgetIndicator />
        <div className="mr-auto" />
        <ReproductionIndicator />
        <MapSettingsButton />
        <ResearchButton />
        <DashboardButton />
        <AdvanceTurnButton />
      </div>
    </nav>
  );
};

export default TopBar;
