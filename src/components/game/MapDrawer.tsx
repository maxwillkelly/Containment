import React from 'react';
import useMapStore from '../../stores/MapStore';
import useViralStore from '../../stores/ViralStore';

const DashedHeading: React.FC = ({ children }) => (
  <h2 className="text-sm dashed-heading text-center text-gray-300">
    {children}
  </h2>
);

const InformationList: React.FC = ({ children }) => (
  <div className="grid grid-cols-2 grid-flow-row gap-y-3 px-4 py-5 text-sm">
    {children}
  </div>
);

const NationalDetails: React.FC = () => {
  return (
    <>
      <DashedHeading>National Details</DashedHeading>
      <InformationList>
        <h4 className="text-left">Population</h4>
        <h4 className="text-right">923 million</h4>
        <h4 className="text-left">Capital</h4>
        <h4 className="text-right">Denver</h4>
        <h4 className="text-left">Largest city</h4>
        <h4 className="text-right">Denver</h4>
        <h4 className="text-left">Largest state</h4>
        <h4 className="text-right">Los Almos</h4>
        <h4 className="text-left">National language</h4>
        <h4 className="text-right">Planetarian</h4>
        <h4 className="text-left">Currency</h4>
        <h4 className="text-right">Planetarian Pound</h4>
        <h4 className="text-left">Driving side</h4>
        <h4 className="text-right">Left</h4>
      </InformationList>
    </>
  );
};

const StateDetails: React.FC = () => {
  const selectedState = useMapStore((state) => state.selectedState);

  if (!selectedState) return null;

  return (
    <>
      <DashedHeading>State Details</DashedHeading>
      <InformationList>
        <h4 className="text-left">Population</h4>
        <h4 className="text-right">
          {`${selectedState.population / 1000000} million`}
        </h4>
      </InformationList>
    </>
  );
};

const ViralDetails: React.FC = () => {
  const selectedState = useMapStore((state) => state.selectedState);
  const getViralDetails = useViralStore((state) => state.getViralDetails);

  const cumulative = selectedState
    ? getViralDetails(selectedState.name)
    : getViralDetails();

  return (
    <>
      <DashedHeading>Weekly Data</DashedHeading>
      <InformationList>
        <h4 className="text-left text-base text-yellow-300">Infected</h4>
        <h4 className="text-right">0</h4>
        <h4 className="text-left text-base text-red-500">Deaths</h4>
        <h4 className="text-right">0</h4>
        <h4 className="text-left text-base text-green-500">Recovered</h4>
        <h4 className="text-right">0</h4>
        <h4 className="text-left text-base text-blue-500">Inoculated</h4>
        <h4 className="text-right">0</h4>
      </InformationList>
      <DashedHeading>Cumulative Data</DashedHeading>
      <InformationList>
        <h4 className="text-left text-base text-yellow-300">Infected</h4>
        <h4 className="text-right">{cumulative.infected}</h4>
        <h4 className="text-left text-base text-red-500">Deaths</h4>
        <h4 className="text-right">{cumulative.death}</h4>
        <h4 className="text-left text-base text-green-500">Recovered</h4>
        <h4 className="text-right">{cumulative.recovered}</h4>
        <h4 className="text-left text-base text-blue-500">Inoculated</h4>
        <h4 className="text-right">{cumulative.inoculated}</h4>
      </InformationList>
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
      <DashedHeading>Debug</DashedHeading>
      <InformationList>
        <h4 className="text-left">Person Machines</h4>
        <h4 className="text-right">{getMachinesTotal(selectedState.name)}</h4>
        <pre>
          {JSON.stringify(getMachinesStates(selectedState.name), null, 2)}
        </pre>
      </InformationList>
      <InformationList>
        <h4 className="text-left">Viral Details</h4>
        <h4 className="text-right">{}</h4>
        <pre>
          {JSON.stringify(getViralDetails(selectedState.name), null, 2)}
        </pre>
      </InformationList>
    </>
  );
};

const MapDrawer: React.FC = () => {
  const open = useMapStore((state) => state.isMapDrawerOpen);
  const selectedState = useMapStore((state) => state.selectedState);

  const asideClass = open ? 'translate-x-0' : 'translate-x-full';

  return (
    <aside
      className={`transform right-0 w-72 dark:bg-gray-700 dark:text-gray-200 border-l border-t border-gray-900 shadow fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${asideClass}`}
    >
      <div className="flex flex-col justify-center">
        <h3 className="text-lg px-4 py-5">
          {selectedState ? selectedState.name : 'The United Planet'}
        </h3>
      </div>
      <ViralDetails />
      {selectedState ? <StateDetails /> : <NationalDetails />}
      <DebugDetails />
    </aside>
  );
};

export default MapDrawer;
