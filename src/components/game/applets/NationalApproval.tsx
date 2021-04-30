import React from 'react';
import { formatPercentage } from '../../../libs/numeral';

import useGameStore from '../../../stores/GameStore';
import usePoliticalStore from '../../../stores/PoliticalStore';

import { getBgColour } from './shared';

const NationalApproval: React.FC = () => {
  const applet = 'NationalApproval';
  const turn = useGameStore((state) => state.turn);
  const activeApplet = useGameStore((state) => state.activeApplet);
  const toggleActiveApplet = useGameStore((state) => state.toggleActiveApplet);
  const getPopularity = usePoliticalStore((state) => state.getPopularity);

  const popularity = formatPercentage(getPopularity(turn));

  return (
    <button
      className={`px-3 ${getBgColour(activeApplet === applet)}`}
      type="button"
      onClick={() => toggleActiveApplet(applet)}
    >
      <h3 className="text-lg">{popularity}</h3>
      <h6 className="text-xs">National Approval</h6>
    </button>
  );
};

export default NationalApproval;
