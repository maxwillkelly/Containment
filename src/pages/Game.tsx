import React, { useEffect } from 'react';
import useGameStore from '../stores/GameStore';
import useViralStore from '../stores/ViralStore';

import TopBar from '../components/game/TopBar';
import Map from '../components/game/Map';
import PauseMenu from '../components/game/PauseMenu';

import * as states from '../../map/geojson/states.geojson';

const Game: React.FC = () => {
  const SIMS_PER_MILLION = 20;
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
        <Map />
        {paused && <PauseMenu />}
      </main>
    </div>
  );
};

export default Game;
