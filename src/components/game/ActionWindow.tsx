import React, { useState } from 'react';
import { ActionRange } from '../../data/actions';
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

interface GraduationTextProps {
  graduation: number;
  range: ActionRange;
  rawRange: number;
  steps: number;
}

const GraduationText: React.FC<GraduationTextProps> = ({
  graduation,
  range,
  rawRange,
  steps,
}) => {
  const { lowest, type } = range;

  const graduationNumber = Math.round(lowest + (graduation / steps) * rawRange);

  const graduationShown =
    type === 'money' ? `£${graduationNumber}` : `${graduationNumber}%`;

  return <p className="dark:text-gray-200 text-xl">{graduationShown}</p>;
};

const GraduationControls: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const [graduation, setGraduation] = useState(50);

  if (!shownAction) return null;

  const { range } = shownAction;
  const { step, lowest, highest } = range;

  const rawRange = highest - lowest;
  const steps = rawRange / step;

  return (
    <>
      <input
        className="row-start-6 col-start-2 col-end-10"
        type="range"
        min="0"
        max={steps}
        onChange={(e) => setGraduation(parseInt(e.target.value, 10))}
        value={graduation}
      />
      <div className="row-start-6 col-start-11">
        <GraduationText
          graduation={graduation}
          range={range}
          rawRange={rawRange}
          steps={steps}
        />
      </div>
    </>
  );
};

const ActionWindow: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);

  if (!shownAction) return null;

  const { name, description } = shownAction;

  return (
    <div className="z-20">
      <GameWindow title={name} footer={<Footer />}>
        <div className="grid grid-rows-6 grid-cols-12 items-center h-full">
          <h3>{description}</h3>
          <GraduationControls />
        </div>
      </GameWindow>
    </div>
  );
};

export default ActionWindow;
