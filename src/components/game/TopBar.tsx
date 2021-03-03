import React, { useState } from 'react';
import {
  GiPauseButton,
  GiPlayButton,
  GiPositionMarker,
  GiProgression,
  GiStoneCrafting,
  GiTestTubes,
} from 'react-icons/gi';

import useGameStore from '../../stores/GameStore';
import ActionsMenu from './ActionsMenu';

const PauseButton: React.FC = () => {
  const isPaused = useGameStore((state) => state.isPaused);
  const togglePause = useGameStore((state) => state.togglePause);
  const bgClass = isPaused ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`p-3 ${bgClass}`}
      type="button"
      onClick={() => togglePause()}
    >
      <GiPauseButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ActionsButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <div>
      <button
        className={`flex items-center justify-items-center p-3 ${bgClass}`}
        type="button"
        onClick={() => setShow((state) => !state)}
      >
        <GiStoneCrafting className="dark:text-gray-200 text-3xl" />
        <h3 className="text-xl ml-2">27</h3>
      </button>
      <div className="fixed">{show && <ActionsMenu />}</div>
    </div>
  );
};

const NationalApproval: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <h3 className="text-lg">55%</h3>
      <h6 className="text-xs">National Approval</h6>
    </button>
  );
};

const BudgetIndicator: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <h3 className="text-lg">£1,136.07 Bn</h3>
      <h6 className="text-xs">Deficit</h6>
    </button>
  );
};

const ReproductionIndicator: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <h3 className="text-lg">1.5</h3>
      <h6 className="text-xs">R</h6>
    </button>
  );
};

const MapSettingsButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <GiPositionMarker className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ResearchButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <GiTestTubes className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const DashboardButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <GiProgression className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ImmunityBar: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
      <div className="h-3 w-32 relative rounded-full overflow-hidden">
        <div className="w-full h-full dark:bg-gray-200 absolute" />
        <div className="transition-all ease-out duration-1000 bg-green-500 relative w-0" />
      </div>
      <h6 className="text-xs">Immunity Bar</h6>
    </button>
  );
};

const AdvanceTurnButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const bgClass = show ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`px-3 ${bgClass}`}
      type="button"
      onClick={() => setShow((state) => !state)}
    >
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
        <ImmunityBar />
        <AdvanceTurnButton />
      </div>
    </nav>
  );
};

export default TopBar;
