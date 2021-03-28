import React from 'react';
import useGameStore from '../../stores/GameStore';

const MapDrawer = () => {
  const open = useGameStore((state) => state.isMapDrawerOpen);
  const asideClass = open ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside
      className={`transform right-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <h3>Hello</h3>
    </aside>
  );
};

export default MapDrawer;
