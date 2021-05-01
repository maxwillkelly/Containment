import React from 'react';
import { Action } from '../../interfaces/action';
import useGameStore from '../../stores/GameStore';
import useMapStore from '../../stores/MapStore';

interface ActionItemProps {
  action: Action;
}

const ActionItem: React.FC<ActionItemProps> = ({ action }) => {
  const shownAction = useGameStore((state) => state.shownAction);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);
  const togglePolicyDrawer = useMapStore((state) => state.togglePolicyDrawer);
  const toggleShownAction = useGameStore((state) => state.toggleShownAction);

  const selected = shownAction && shownAction.id === action.id;
  const bgColour = selected ? 'bg-selected' : 'hover:bg-gray-600';

  const handleClick = () => {
    toggleActiveApplet('ActionsButton', false);
    togglePolicyDrawer(false);
    toggleShownAction(action);
  };

  return (
    <>
      <button
        className={`flex flex-row items-center p-2 rounded-lg text-left ${bgColour}`}
        type="button"
        onClick={handleClick}
      >
        <div className="h-8 w-8 bg-white mr-4" />
        <p>{action.name}</p>

        <div className="mr-auto" />
      </button>
    </>
  );
};

export default ActionItem;
