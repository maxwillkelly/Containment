import React, { useState } from 'react';
import { Action } from '../../data/actions';
import useActionsStore from '../../stores/ActionsStore';
import useMapStore from '../../stores/MapStore';

interface ActionItemProps {
  action: Action;
}

const ActionItem: React.FC<ActionItemProps> = ({ action }) => {
  const [selected, setSelected] = useState(false);
  const bgColour = selected ? 'bg-selected' : 'hover:bg-gray-600';

  return (
    <button
      className={`flex flex-row items-center p-2 rounded-lg text-left ${bgColour}`}
      type="button"
      onClick={() => setSelected((state) => !state)}
    >
      <div className="h-8 w-8 bg-white mr-4" />
      <p>{action.name}</p>
      <div className="mr-auto" />
    </button>
  );
};

const ActionList: React.FC = () => {
  const activeActions = useActionsStore((state) => state.active);

  return (
    <div className="flex flex-col col-span-8 p-3 max-h-80 overflow-y-auto">
      {activeActions.map((a) => (
        <ActionItem action={a} key={a.id} />
      ))}
    </div>
  );
};

const PolicyDrawer = () => {
  const open = useMapStore((state) => state.isPolicyDrawerOpen);
  const asideClass = open ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside
      className={`transform left-0 w-64 dark:bg-gray-700 dark:text-gray-200 border-r border-t border-gray-900 shadow fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <div className="flex flex-col justify-center items-end">
        <h3 className="text-lg px-4 py-5">Policies</h3>
      </div>
      <ActionList />
    </aside>
  );
};

export default PolicyDrawer;
