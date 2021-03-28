import React from 'react';
import useGameStore from '../../stores/GameStore';

const ActionDrawer = () => {
  const open = useGameStore((state) => state.isActionDrawerOpen);
  const asideClass = open ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside
      className={`transform left-0 w-48 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <h3>Actions</h3>
    </aside>
  );
};

export default ActionDrawer;
