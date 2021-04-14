import React from 'react';
import useMapStore from '../../stores/MapStore';

const PolicyDrawer = () => {
  const open = useMapStore((state) => state.isPolicyDrawerOpen);
  const asideClass = open ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside
      className={`transform left-0 w-48 dark:bg-gray-700 dark:text-gray-200 border-r border-t border-gray-900 shadow fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <div className="flex flex-col justify-center items-end">
        <h3 className="text-lg px-4 py-5">Policies</h3>
      </div>
    </aside>
  );
};

export default PolicyDrawer;
