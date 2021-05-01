import React from 'react';
import { GiPositionMarker } from 'react-icons/gi';

import useGameStore from '../../../stores/GameStore';

import { getBgColour } from './shared';

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

export default MapSettingsButton;
