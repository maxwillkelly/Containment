import React from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import GameWindow from '../components/shared/GameWindow';
import WindowButton from '../components/shared/WindowButton';
import { Params } from '../interfaces/router';
import { formatNumber, formatPercentage } from '../libs/numeral';
import useGameStore from '../stores/GameStore';
import usePoliticalStore from '../stores/PoliticalStore';
import useViralStore from '../stores/ViralStore';

const Footer: React.FC = () => {
  const history = useHistory();

  return <WindowButton title="Return" handleClick={() => history.push('/')} />;
};

const Finish: React.FC = () => {
  const params = useParams<Params>();
  const turn = useGameStore((state) => state.turn);
  const getPopularity = usePoliticalStore((state) => state.getPopularity);
  const getViralDetails = useViralStore((state) => state.getViralDetails);

  const success: boolean = JSON.parse(params.success);
  const popularity = formatPercentage(getPopularity(turn));
  const viralDetails = getViralDetails(turn);
  const { cumulative } = viralDetails;

  return (
    <div>
      <GameWindow
        title={success ? 'Congratulations' : 'You have been defeated'}
        footer={<Footer />}
      >
        <div className="flex items-center justify-center h-full w-full">
          <div className="grid grid-cols-2 grid-flow-row place-items-center gap-y-3 px-4 py-5 w-96 text-base text-white">
            <h4 className="text-left text-lg text-yellow-300">Infected</h4>
            <h4 className="text-right">{formatNumber(cumulative.infected)}</h4>
            <h4 className="text-left text-lg text-red-500">Deaths</h4>
            <h4 className="text-right">{formatNumber(cumulative.death)}</h4>
            <h4 className="text-left text-lg text-green-500">Recovered</h4>
            <h4 className="text-right">{formatNumber(cumulative.recovered)}</h4>
            <h4 className="text-left text-lg text-blue-500">Inoculated</h4>
            <h4 className="text-right">
              {formatNumber(cumulative.inoculated)}
            </h4>
            <h4 className="text-left text-lg">Last Approval</h4>
            <h4 className="text-right">{popularity}</h4>
          </div>
        </div>
      </GameWindow>
    </div>
  );
};

export default Finish;
