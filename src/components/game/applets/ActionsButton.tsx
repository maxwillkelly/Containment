import React from 'react';
import { GiStoneCrafting } from 'react-icons/gi';

import useActionsStore from '../../../stores/ActionsStore';
import useActionsMenuStore from '../../../stores/ActionsMenuStore';
import useGameStore from '../../../stores/GameStore';
import useMapStore from '../../../stores/MapStore';

import ActionsMenu from './actions-button/ActionsMenu';

import { getBgColour } from './shared';

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

export default ActionsButton;
