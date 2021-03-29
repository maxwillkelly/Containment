import React, { useEffect } from 'react';
import { GiInfo } from 'react-icons/gi';
import useGameStore from '../stores/GameStore';
import useViralStore from '../stores/ViralStore';

import TopBar from '../components/game/TopBar';
import Map from '../components/game/Map';
import PauseMenu from '../components/game/PauseMenu';

import * as states from '../../map/geojson/states.geojson';
import MapDrawer from '../components/game/MapDrawer';
import ActionDrawer from '../components/game/ActionDrawer';

const getBgColour = (state: boolean) =>
  state ? 'bg-selected' : 'hover:bg-gray-600';

const ActionDrawerToggle: React.FC = () => {
  const open = useGameStore((state) => state.isActionDrawerOpen);
  const toggleActionDrawer = useGameStore((state) => state.toggleActionDrawer);

  return (
    <button
      className={`fixed p-2 m-3 ${getBgColour(open)} z-40`}
      type="button"
      onClick={() => toggleActionDrawer()}
    >
      <GiInfo className="dark:text-gray-200 text-2xl" />
    </button>
  );
};

const MapDrawerToggle: React.FC = () => {
  const open = useGameStore((state) => state.isMapDrawerOpen);
  const toggleMapDrawer = useGameStore((state) => state.toggleMapDrawer);

  return (
    <button
      className={`right-0 fixed p-2 m-3 ${getBgColour(open)} z-40`}
      type="button"
      onClick={() => toggleMapDrawer()}
    >
      <GiInfo className="dark:text-gray-200 text-2xl" />
    </button>
  );
};

const Game: React.FC = () => {
  const SIMS_PER_MILLION = 0;
  const turn = useGameStore((state) => state.turn);
  const paused = useGameStore((state) => state.isPaused);
  const createPerson = useViralStore((state) => state.createPerson);

  const setupNewGame = async () => {
    const startTime = new Date().getTime();

    // eslint-disable-next-line no-restricted-syntax
    for (const state of states.features) {
      const name = state.properties.Name;
      const population = state.properties.Population;
      const residentPersonsNum = (population / 1000000) * SIMS_PER_MILLION;

      for (let index = 0; index < residentPersonsNum; index += 1) {
        createPerson(2, name);
      }
      console.log(`${name}: ${population} ${residentPersonsNum}`);
    }

    const endTime = new Date().getTime();
    console.log(endTime - startTime);
  };

  useEffect(() => {
    if (turn === 0) setupNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
