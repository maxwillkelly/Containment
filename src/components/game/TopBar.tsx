import React, { useEffect, useRef } from 'react';
import {
  GiPauseButton,
  GiPlayButton,
  GiPositionMarker,
  GiProgression,
  GiStoneCrafting,
  GiTestTubes,
} from 'react-icons/gi';

import { useHistory } from 'react-router-dom';
import { ViralDetails } from '../../interfaces/viralStore';
import { formatCurrency, formatPercentage } from '../../libs/numeral';

import useActionsMenuStore from '../../stores/ActionsMenuStore';
import useActionsStore from '../../stores/ActionsStore';
import useBudgetStore from '../../stores/BudgetStore';
import useGameStore from '../../stores/GameStore';
import useMapStore from '../../stores/MapStore';
import usePoliticalStore from '../../stores/PoliticalStore';
import useVaccineStore from '../../stores/VaccineStore';
import useViralStore from '../../stores/ViralStore';
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
  const togglePolicyDrawer = useMapStore((state) => state.togglePolicyDrawer);
  const actionPoints = useActionsStore((state) => state.points);
  const resetActionsMenuStore = useActionsMenuStore((state) => state.reset);

  const handleClick = () => {
    resetActionsMenuStore();
    togglePolicyDrawer(false);
    toggleActiveApplet(applet);
  };

  return (
    <div>
      <button
        className={`flex items-center justify-items-center p-3 ${getBgColour(
          activeApplet === applet
        )}`}
        type="button"
        onClick={handleClick}
      >
        <GiStoneCrafting className="dark:text-gray-200 text-3xl" />
        <h3 className="text-xl ml-2">{actionPoints}</h3>
      </button>
      {activeApplet === applet && <ActionsMenu />}
    </div>
  );
};

const NationalApproval: React.FC = () => {
  const applet = 'NationalApproval';
  const turn = useGameStore((state) => state.turn);
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);
  const getPopularity = usePoliticalStore((state) => state.getPopularity);

  const popularity = formatPercentage(getPopularity(turn));

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">{popularity}</h3>
      <h6 className="text-xs">National Approval</h6>
    </button>
  );
};

const BudgetIndicator: React.FC = () => {
  const applet = 'BudgetIndicator';

  const turn = useGameStore((state) => state.turn);
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);

  const getBudgetDetails = useBudgetStore((state) => state.getBudgetDetails);

  const budgetDetails = getBudgetDetails(turn);
  const { absoluteDifference, inDebt } = budgetDetails;

  const difference = formatCurrency(absoluteDifference);

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">{difference}</h3>
      <h6 className="text-xs">{inDebt ? 'Deficit' : 'Surplus'}</h6>
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

const VaccinesButton: React.FC = () => {
  const applet = 'VaccinesButton';
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

const calculateImmunity = (viralDetails: ViralDetails) => {
  const immune =
    viralDetails.cumulative.inoculated + viralDetails.cumulative.recovered;

  const immunity = (immune / 923000000) * 100;
  return immunity;
};

const ImmunityBar: React.FC = () => {
  const applet = 'ImmunityBar';

  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);
  const turn = useGameStore((state) => state.turn);

  const getViralDetails = useViralStore((state) => state.getViralDetails);

  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viralDetails = getViralDetails(turn);
    const immunity = calculateImmunity(viralDetails);

    if (progressBar.current)
      progressBar.current.style.width = `${immunity.toString()}%`;
  });

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <div className="h-3 w-32 relative rounded-full overflow-hidden">
        <div className="w-full h-full dark:bg-gray-200 absolute" />
        <div
          className="transition-all ease-out duration-1000 bg-green-500 relative h-full"
          ref={progressBar}
        />
      </div>
      <h6 className="text-xs">Immunity Bar</h6>
    </button>
  );
};

const AdvanceTurnButton: React.FC = () => {
  const history = useHistory();

  const setLoading = useGameStore((state) => state.setLoading);
  const turn = useGameStore((state) => state.turn);
  const getPopularity = usePoliticalStore((state) => state.getPopularity);
  const getViralDetails = useViralStore((state) => state.getViralDetails);
  const getVaccinations = useVaccineStore((state) => state.getVaccinations);

  const takeTurn = useViralStore((state) => state.takeTurn);
  const advanceActionTurn = useActionsStore((state) => state.advanceTurn);
  const advanceBudgetTurn = useBudgetStore((state) => state.advanceTurn);
  const advanceGameTurn = useGameStore((state) => state.advanceTurn);
  const advancePoliticalTurn = usePoliticalStore((state) => state.advanceTurn);
  const advanceVaccineTurn = useVaccineStore((state) => state.advanceTurn);

  const checkFinished = () => {
    const popularity = getPopularity(turn);
    const viralDetails = getViralDetails(turn);
    const immunity = calculateImmunity(viralDetails);

    if (immunity > 80) history.push('/finish/true');
    else if (popularity < 0.4) history.push('/finish/false');
  };

  const handleClick = () => {
    setLoading(true);

    const vaccinations = getVaccinations(turn);
    const nextTurn = turn + 1;

    takeTurn(vaccinations, nextTurn);
    advanceVaccineTurn(nextTurn);

    advanceActionTurn();
    advanceBudgetTurn();
    advanceGameTurn();
    advancePoliticalTurn();

    checkFinished();

    setLoading(false);
  };

  return (
    <button className="px-3" type="button" onClick={handleClick}>
      <GiPlayButton className="dark:text-gray-200 text-3xl" />
    </button>
  );
};

const TopBar: React.FC = () => {
  return (
    <nav className="dark:bg-gray-700 dark:text-gray-200">
      <div className="flex flex-row divide-x dark:divide-gray-900 justify-between shadow">
        <PauseButton />
        <ActionsButton />
        <NationalApproval />
        <BudgetIndicator />
        <div className="mr-auto" />
        <ReproductionIndicator />
        <MapSettingsButton />
        <VaccinesButton />
        <DashboardButton />
        <ImmunityBar />
        <AdvanceTurnButton />
      </div>
    </nav>
  );
};

export default TopBar;
