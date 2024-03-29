import React, { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { GiHamburgerMenu, GiInfo } from 'react-icons/gi';

import useGameStore from '../stores/GameStore';
import useMapStore from '../stores/MapStore';
import useViralStore from '../stores/ViralStore';

import TopBar from '../components/game/TopBar';
import Map from '../components/game/Map';
import PauseMenu from '../components/game/PauseMenu';

import MapDrawer from '../components/game/MapDrawer';
import PolicyDrawer from '../components/game/PolicyDrawer';
import LoadingScreen from '../components/game/LoadingScreen';
import ActionWindow from '../components/game/ActionWindow';
import VaccineMenu from '../components/game/VaccineMenu';

const getBgColour = (state: boolean) =>
  state ? 'bg-selected' : 'hover:bg-gray-600';

const PolicyDrawerToggle: React.FC = () => {
  const open = useMapStore((state) => state.isPolicyDrawerOpen);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);
  const togglePolicyDrawer = useMapStore((state) => state.togglePolicyDrawer);

  const handleClick = () => {
    toggleActiveApplet('ActionsButton', false);
    togglePolicyDrawer();
  };

  return (
    <button
      className={`fixed p-2 m-3 dark:bg-gray-700 ${getBgColour(
        open
      )} rounded z-40`}
      type="button"
      onClick={handleClick}
    >
      <GiHamburgerMenu className="dark:text-gray-200 text-2xl" />
    </button>
  );
};

const MapDrawerToggle: React.FC = () => {
  const open = useMapStore((state) => state.isMapDrawerOpen);
  const toggleMapDrawer = useMapStore((state) => state.toggleMapDrawer);

  return (
    <button
      className={`right-0 fixed p-2 m-3 dark:bg-gray-700 ${getBgColour(
        open
      )} rounded z-40`}
      type="button"
      onClick={() => toggleMapDrawer()}
    >
      <GiInfo className="dark:text-gray-200 text-2xl" />
    </button>
  );
};

const ActiveApplets: React.FC = () => {
  const activeApplet = useGameStore((state) => state.activeApplet);
  if (activeApplet === 'VaccinesButton') return <VaccineMenu />;
  return null;
};

const Game: React.FC = () => {
  const paused = useGameStore((state) => state.isPaused);
  const loading = useGameStore((state) => state.loading);
  const setLoading = useGameStore((state) => state.setLoading);
  const turn = useGameStore((state) => state.turn);

  const [personsInitialised, generateOutbreak] = useViralStore(
    (state) => [state.personsInitialised, state.generateOutbreak],
    shallow
  );

  useEffect(() => {
    if (!personsInitialised) generateOutbreak(turn);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="h-screen w-screen flex flex-col">
      <TopBar />
      <main className="relative flex-1">
        <PolicyDrawerToggle />
        <MapDrawerToggle />
        <PolicyDrawer />
        <MapDrawer />
        <Map />
        <ActionWindow />
        <ActiveApplets />
        {paused && <PauseMenu />}
      </main>
    </div>
  );
};

export default Game;
