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

interface GraduationInformationProps {
  graduationPercentage: number;
}

const GraduationInformation: React.FC<GraduationInformationProps> = ({
  graduationPercentage,
}) => {
  const shownAction = useGameStore((state) => state.shownAction);

  if (!shownAction) return null;

  const { pointsCost, impact } = shownAction;
  const { start } = pointsCost;
  const { budget, popularity } = impact;

  const budgetChange = `${Math.round(
    budget(graduationPercentage) / 1000000000
  )} billion`;
  const popularityChange = `${Math.round(
    popularity(graduationPercentage) * 100
  )}%`;

  return (
    <div className="grid grid-cols-3 divide-x dark:divide-gray-200 border rounded-md dark:text-gray-200 text-center">
      <div className="">
        <h4 className="text-xl">Action Points</h4>
        <h5 className="">{start}</h5>
      </div>
      <div className="">
        <h4 className="text-lg">Budget Change</h4>
        <h5 className="">{budgetChange}</h5>
      </div>
      <div className="">
        <h4 className="text-lg">Popularity</h4>
        <h5 className="">{popularityChange}</h5>
      </div>
    </div>
  );
};

interface GraduationTextProps {
  graduationPercentage: number;
  range: ActionRange;
  rawRange: number;
  steps: number;
}

const GraduationText: React.FC<GraduationTextProps> = ({
  graduationPercentage,
  range,
  rawRange,
  steps,
}) => {
  const { lowest, textPrepend, textAppend } = range;

  const graduationNumber = Math.round(lowest + graduationPercentage * rawRange);

  const graduationShown = `${textPrepend}${graduationNumber}${textAppend}`;

  return (
    <p className="dark:text-gray-200 text-lg text-center">{graduationShown}</p>
  );
};

const GraduationControls: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const [graduation, setGraduation] = useState(1);

  if (!shownAction) return null;

  const { range } = shownAction;
  const { step, lowest, highest } = range;

  const rawRange = highest - lowest;
  const steps = rawRange / step;
  const graduationPercentage = graduation / steps;

  return (
    <>
      <div className="row-start-4 row-span-2 col-start-2 col-end-10">
        <GraduationInformation graduationPercentage={graduationPercentage} />
      </div>
      <input
        className="row-start-6 col-start-2 col-end-10"
        type="range"
        min="0"
        max={steps}
        onChange={(e) => setGraduation(parseInt(e.target.value, 10))}
        value={graduation}
      />
      <div className="row-start-6 col-start-10 col-end-13">
        <GraduationText
          graduationPercentage={graduationPercentage}
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
