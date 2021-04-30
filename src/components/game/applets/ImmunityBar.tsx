import React, { useEffect, useRef } from 'react';
import useGameStore from '../../../stores/GameStore';
import useViralStore from '../../../stores/ViralStore';
import { calculateImmunity, getBgColour } from './shared';

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

export default ImmunityBar;
