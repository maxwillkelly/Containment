import React from 'react';
import { GiProgression } from 'react-icons/gi';

import useGameStore from '../../../stores/GameStore';

import { getBgColour } from './shared';

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

export default DashboardButton;
