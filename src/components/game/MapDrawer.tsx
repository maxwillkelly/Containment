import React from 'react';
import useMapStore from '../../stores/MapStore';
import useViralStore from '../../stores/ViralStore';

const StateDetails: React.FC = () => {
  const selectedState = useMapStore((state) => state.selectedState);

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
  const selectedState = useMapStore((state) => state.selectedState);
  const getMachinesTotal = useViralStore((state) => state.getMachinesTotal);
  const getMachinesStates = useViralStore((state) => state.getMachinesStates);
  const getViralDetails = useViralStore((state) => state.getViralDetails);

  if (!selectedState) return null;

  return (
    <>
      <h2 className="text-sm dashed-heading text-center text-gray-300">
        Debug
      </h2>
      <div className="grid grid-cols-2 grid-flow-row px-4 py-5 text-sm">
        <h4 className="text-left">Person Machines</h4>
        <h4 className="text-right">{getMachinesTotal(selectedState.name)}</h4>
        <pre>
          {JSON.stringify(getMachinesStates(selectedState.name), null, 2)}
        </pre>
      </div>
      <div className="grid grid-cols-2 grid-flow-row px-4 py-5 text-sm">
        <h4 className="text-left">Viral Details</h4>
        <h4 className="text-right">{}</h4>
        <pre>
          {JSON.stringify(getViralDetails(selectedState.name), null, 2)}
        </pre>
      </div>
    </>
  );
};

const MapDrawer: React.FC = () => {
  const open = useMapStore((state) => state.isMapDrawerOpen);
  const selectedState = useMapStore((state) => state.selectedState);

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
