import React from 'react';
import useActionsStore from '../../stores/ActionsStore';
import useGameStore from '../../stores/GameStore';
import GameWindow from '../shared/GameWindow';
import WindowButton from '../shared/WindowButton';

const Footer: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const toggleShownAction = useGameStore((state) => state.toggleShownAction);
  const active = useActionsStore((state) => state.active);
  const startAction = useActionsStore((state) => state.startAction);
  const cancelAction = useActionsStore((state) => state.cancelAction);

  if (!shownAction) return null;

  const isActionActive = active.some((a) => a.id === shownAction.id);

  const handleClose = () => toggleShownAction(shownAction, false);

  const handleStartAction = () => {
    startAction(shownAction);
    handleClose();
  };

  const handleCancelAction = () => {
    cancelAction(shownAction);
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
