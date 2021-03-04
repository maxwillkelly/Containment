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

const getBgColour = (state: boolean) =>
  state ? 'bg-selected' : 'hover:bg-gray-600';

const PauseButton: React.FC = () => {
  const isPaused = useGameStore((state) => state.isPaused);
  const togglePause = useGameStore((state) => state.togglePause);

  return (
    <button
      className={`p-3 ${getBgColour(isPaused)}`}
      type="button"
      onClick={() => togglePause()}
    >
      <GiPauseButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ActionsButton: React.FC = () => {
  const applet = 'ActionsButton';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <div>
      <button
        className={`flex items-center justify-items-center p-3 ${getBgColour(
          activeApplet === applet
        )}`}
        type="button"
        onClick={() => toggleActiveApplet(applet)}
      >
        <GiStoneCrafting className="dark:text-gray-200 text-3xl" />
        <h3 className="text-xl ml-2">27</h3>
      </button>
      <div className="fixed">{activeApplet === applet && <ActionsMenu />}</div>
    </div>
  );
};

const NationalApproval: React.FC = () => {
  const applet = 'NationalApproval';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">55%</h3>
      <h6 className="text-xs">National Approval</h6>
    </button>
  );
};

const BudgetIndicator: React.FC = () => {
  const applet = 'BudgetIndicator';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">£1,136.07 Bn</h3>
      <h6 className="text-xs">Deficit</h6>
    </button>
  );
};

const ReproductionIndicator: React.FC = () => {
  const applet = 'ReproductionIndicator';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">1.5</h3>
      <h6 className="text-xs">R</h6>
    </button>
  );
};

const MapSettingsButton: React.FC = () => {
  const applet = 'MapSettingsButton';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <GiPositionMarker className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ResearchButton: React.FC = () => {
  const applet = 'ResearchButton';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <GiTestTubes className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const DashboardButton: React.FC = () => {
  const applet = 'DashboardButton';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <GiProgression className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const ImmunityBar: React.FC = () => {
  const applet = 'ImmunityBar';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
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
  const applet = 'AdvanceTurnButton';
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
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
