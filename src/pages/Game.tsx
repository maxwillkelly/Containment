import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu, GiInfo } from 'react-icons/gi';
import shallow from 'zustand/shallow';

import useGameStore from '../stores/GameStore';
import useViralStore from '../stores/ViralStore';

import TopBar from '../components/game/TopBar';
import Map from '../components/game/Map';
import PauseMenu from '../components/game/PauseMenu';

import MapDrawer from '../components/game/MapDrawer';
import ActionDrawer from '../components/game/ActionDrawer';
import LoadingScreen from '../components/game/LoadingScreen';

const getBgColour = (state: boolean) =>
  state ? 'bg-selected' : 'hover:bg-gray-600';

const ActionDrawerToggle: React.FC = () => {
  const open = useGameStore((state) => state.isActionDrawerOpen);
  const toggleActionDrawer = useGameStore((state) => state.toggleActionDrawer);

  return (
    <button
      className={`fixed p-2 m-3 dark:bg-gray-700 ${getBgColour(
        open
      )} rounded z-40`}
      type="button"
      onClick={() => toggleActionDrawer()}
    >
      <GiHamburgerMenu className="dark:text-gray-200 text-2xl" />
    </button>
  );
};

const MapDrawerToggle: React.FC = () => {
  const open = useGameStore((state) => state.isMapDrawerOpen);
  const toggleMapDrawer = useGameStore((state) => state.toggleMapDrawer);

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

const Game: React.FC = () => {
  const paused = useGameStore((state) => state.isPaused);
  const loading = useGameStore((state) => state.loading);
  const setLoading = useGameStore((state) => state.setLoading);

  const [personsInitialised, generateOutbreak] = useViralStore(
    (state) => [state.personsInitialised, state.generateOutbreak],
    shallow
  );

  useEffect(() => {
    if (!personsInitialised) generateOutbreak();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="h-screen w-screen flex flex-col">
      <TopBar />
      <main className="relative flex-1">
        <ActionDrawerToggle />
        <MapDrawerToggle />
        <ActionDrawer />
        <MapDrawer />
        <Map />
        {paused && <PauseMenu />}
      </main>
    </div>
  );
};

export default Game;
