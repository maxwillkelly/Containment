import React from 'react';
import useActionsStore from '../../stores/ActionsStore';
import useGameStore from '../../stores/GameStore';
import GameWindow from '../shared/GameWindow';
import WindowButton from '../shared/WindowButton';

const Footer: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const toggleShownAction = useGameStore((state) => state.toggleShownAction);
  const active = useActionsStore((state) => state.active);

  if (!shownAction) return null;

  const isActionActive = active.some((a) => a.id === shownAction.id);

  const handleClose = () => toggleShownAction(shownAction, false);

  const handleCancelAction = () => {
    handleClose();
  };

  const handleStartAction = () => {
    handleClose();
  };

  if (isActionActive)
    return (
      <>
        <WindowButton title="Cancel Action" handleClick={handleCancelAction} />
        <WindowButton title="Close" handleClick={handleClose} />
      </>
    );

  return (
    <>
      <WindowButton title="Start" handleClick={handleStartAction} />
      <WindowButton title="Close" handleClick={handleClose} />
    </>
  );
};

const ActionWindow: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);

  if (!shownAction) return null;

  return (
    <div className="z-20">
      <GameWindow title={shownAction.name} footer={<Footer />}>
        <h3>Description</h3>
      </GameWindow>
    </div>
  );
};

export default ActionWindow;
