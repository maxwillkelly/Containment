import React from 'react';
import useGameStore from '../../stores/GameStore';

const MapDrawer = () => {
  const open = useGameStore((state) => state.isMapDrawerOpen);
  const selectedState = useGameStore((state) => state.selectedState);

  const asideClass = open ? 'translate-x-0' : 'translate-x-full';

  return (
    <aside
      className={`transform right-0 w-64 dark:bg-gray-700 dark:text-gray-200 border-l border-t border-gray-900 shadow fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <div className="flex flex-col justify-center">
        <h3 className="text-lg px-4 py-5">{selectedState}</h3>
      </div>
    </aside>
  );
};

export default MapDrawer;
