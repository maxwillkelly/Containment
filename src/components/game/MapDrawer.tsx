import React from 'react';
import useGameStore from '../../stores/GameStore';
import useViralStore from '../../stores/ViralStore';

const StateDetails: React.FC = () => {
  const selectedState = useGameStore((state) => state.selectedState);

  if (!selectedState) return null;

  return (
    <>
      <h2 className="text-sm dashed-heading text-center text-gray-300">
        State Details
      </h2>
      <div className="grid grid-cols-2 grid-flow-row px-4 py-5 text-sm">
        <h4 className="text-left">Population</h4>
        <h4 className="text-right">
          {`${selectedState.population / 1000000} million`}
        </h4>
      </div>
    </>
  );
};

const DebugDetails: React.FC = () => {
  const selectedState = useGameStore((state) => state.selectedState);
  const getPersonsTotalByState = useViralStore(
    (state) => state.getPersonsTotalByState
  );
  const getPersonsStatesByState = useViralStore(
    (state) => state.getPersonsStatesByState
  );

  if (!selectedState) return null;

  return (
    <>
      <h2 className="text-sm dashed-heading text-center text-gray-300">
        Debug
      </h2>
      <div className="grid grid-cols-2 grid-flow-row px-4 py-5 text-sm">
        <h4 className="text-left">Person Machines</h4>
        <h4 className="text-right">
          {getPersonsTotalByState(selectedState.name)}
        </h4>
        {/* <pre>
          {JSON.stringify(getPersonsStatesByState(selectedState.name), null, 2)}
        </pre> */}
      </div>
    </>
  );
};

const MapDrawer: React.FC = () => {
  const open = useGameStore((state) => state.isMapDrawerOpen);
  const selectedState = useGameStore((state) => state.selectedState);

  const asideClass = open ? 'translate-x-0' : 'translate-x-full';

  return (
    <aside
      className={`transform right-0 w-64 dark:bg-gray-700 dark:text-gray-200 border-l border-t border-gray-900 shadow fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <div className="flex flex-col justify-center">
        <h3 className="text-lg px-4 py-5">
          {selectedState ? selectedState.name : ''}
        </h3>
      </div>
      <StateDetails />
      <DebugDetails />
    </aside>
  );
};

export default MapDrawer;