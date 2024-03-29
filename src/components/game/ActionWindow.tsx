import React, { ChangeEvent, useEffect } from 'react';

import useActionsStore from '../../stores/ActionsStore';
import useActionWindowStore from '../../stores/ActionWindowStore';
import useBudgetStore from '../../stores/BudgetStore';
import useGameStore from '../../stores/GameStore';
import usePoliticalStore from '../../stores/PoliticalStore';
import useViralStore from '../../stores/ViralStore';

import GameWindow from '../shared/GameWindow';
import WindowButton from '../shared/WindowButton';

import { formatCurrency, formatPercentage } from '../../libs/numeral';

const Footer: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const turn = useGameStore((state) => state.turn);
  const toggleShownAction = useGameStore((state) => state.toggleShownAction);

  const isActionActive = useActionsStore((state) => state.isActionActive);
  const isActionStartable = useActionsStore((state) => state.isActionStartable);
  const isActionEditable = useActionsStore((state) => state.isActionEditable);
  const isActionCancelable = useActionsStore(
    (state) => state.isActionCancelable
  );

  const startAction = useActionsStore((state) => state.startAction);
  const cancelAction = useActionsStore((state) => state.cancelAction);
  const editAction = useActionsStore((state) => state.editAction);

  const graduation = useActionWindowStore((state) => state.graduation);

  const addBudgetModifier = useBudgetStore((state) => state.addActionModifier);

  const editBudgetModifier = useBudgetStore(
    (state) => state.editActionModifier
  );

  const removeBudgetModifier = useBudgetStore(
    (state) => state.removeActionModifier
  );

  const addPoliticalModifier = usePoliticalStore(
    (state) => state.addActionModifier
  );

  const editPoliticalModifier = usePoliticalStore(
    (state) => state.editActionModifier
  );

  const removePoliticalModifier = usePoliticalStore(
    (state) => state.removeActionModifier
  );

  const addViralModifier = useViralStore((state) => state.addActionModifier);

  const editViralModifier = useViralStore((state) => state.editActionModifier);

  const removeViralModifier = useViralStore(
    (state) => state.removeActionModifier
  );

  if (!shownAction || graduation.percentage === undefined) return null;

  const handleClose = () => toggleShownAction(shownAction, false);

  const handleStart = () => {
    if (graduation.percentage !== undefined) {
      const action = startAction(shownAction, graduation.percentage);
      addPoliticalModifier(action, turn);
      addBudgetModifier(action, turn);
      addViralModifier(action, turn);
    }
    handleClose();
  };

  const handleEdit = () => {
    if (graduation.percentage !== undefined) {
      const action = editAction(shownAction, graduation.percentage);
      editPoliticalModifier(action, turn);
      editBudgetModifier(action, turn);
      editViralModifier(action, turn);
    }
    handleClose();
  };

  const handleCancel = () => {
    const action = cancelAction(shownAction);
    removePoliticalModifier(action, turn);
    removeBudgetModifier(action, turn);
    removeViralModifier(action, turn);
    handleClose();
  };

  if (isActionActive(shownAction))
    return (
      <>
        <WindowButton
          title="Cancel Action"
          handleClick={handleCancel}
          disabled={!isActionCancelable(shownAction)}
        />
        <WindowButton
          title="Edit Action"
          handleClick={handleEdit}
          disabled={!isActionEditable(shownAction, graduation.percentage)}
        />
        <WindowButton title="Close" handleClick={handleClose} />
      </>
    );

  return (
    <>
      <WindowButton
        title="Start"
        handleClick={handleStart}
        disabled={!isActionStartable(shownAction)}
      />
      <WindowButton title="Close" handleClick={handleClose} />
    </>
  );
};

const ActionPointsInformation: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const isActionActive = useActionsStore((state) => state.isActionActive);
  const calcEditDeduction = useActionsStore((state) => state.calcEditDeduction);
  const graduation = useActionWindowStore((state) => state.graduation);

  if (!shownAction || graduation.percentage === undefined) return null;

  const { pointsCost } = shownAction;
  const { start, cancel } = pointsCost;

  const editDeduction = calcEditDeduction(shownAction, graduation.percentage);

  if (isActionActive(shownAction))
    return (
      <div className="">
        <h4 className="text-xl">
          Action Points To {editDeduction > 0 ? 'Edit' : 'Cancel'}
        </h4>
        <h5 className="">{editDeduction > 0 ? editDeduction : cancel}</h5>
      </div>
    );

  return (
    <div className="">
      <h4 className="text-xl">Action Points To Start</h4>
      <h5 className="">{start}</h5>
    </div>
  );
};

const GraduationInformation: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const graduation = useActionWindowStore((state) => state.graduation);

  if (
    !shownAction ||
    graduation === undefined ||
    graduation.percentage === undefined
  )
    return null;

  const { impact } = shownAction;
  const { budget, popularity } = impact;

  const { percentage } = graduation;

  const budgetChange = formatCurrency(budget(percentage));
  const popularityChange = formatPercentage(popularity(percentage));

  return (
    <div className="grid grid-cols-3 divide-x dark:divide-gray-200 border rounded-md dark:text-gray-200 text-center">
      <ActionPointsInformation />
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

const GraduationText: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const graduation = useActionWindowStore((state) => state.graduation);

  if (
    !shownAction ||
    graduation === undefined ||
    graduation.percentage === undefined
  )
    return null;

  const { range } = shownAction;
  const { lowest, highest, textPrepend, textAppend } = range;
  const rawRange = highest - lowest;

  const { percentage } = graduation;

  const graduationNumber = Math.round(lowest + percentage * rawRange);

  const graduationShown = `${textPrepend}${graduationNumber}${textAppend}`;

  return (
    <p className="dark:text-gray-200 text-lg text-center">{graduationShown}</p>
  );
};

const GraduationControls: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const graduation = useActionWindowStore((state) => state.graduation);
  const setGraduation = useActionWindowStore((state) => state.setGraduation);

  if (
    !shownAction ||
    graduation.currentSteps === undefined ||
    graduation.totalSteps === undefined
  )
    return null;

  const { currentSteps, totalSteps } = graduation;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const graduationSteps = parseInt(e.target.value, 10);
    setGraduation(graduationSteps);
  };

  return (
    <>
      <div className="row-start-4 row-span-2 col-start-2 col-end-12">
        <GraduationInformation />
      </div>
      <input
        className="row-start-6 col-start-2 col-end-10"
        type="range"
        min="0"
        max={totalSteps}
        onChange={handleChange}
        value={currentSteps}
      />
      <div className="row-start-6 col-start-10 col-end-13">
        <GraduationText />
      </div>
    </>
  );
};

const ActionWindow: React.FC = () => {
  const shownAction = useGameStore((state) => state.shownAction);
  const initialiseGraduation = useActionWindowStore(
    (state) => state.initialiseGraduation
  );

  useEffect(() => {
    if (!shownAction?.graduationPercentage) initialiseGraduation(shownAction);
  }, [initialiseGraduation, shownAction]);

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
