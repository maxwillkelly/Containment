import React from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import GameWindow from '../components/shared/GameWindow';
import WindowButton from '../components/shared/WindowButton';
import { Params } from '../interfaces/router';

const Footer: React.FC = () => {
  const history = useHistory();

  return <WindowButton title="Return" handleClick={() => history.push('/')} />;
};

const Finish: React.FC = () => {
  const params = useParams<Params>();
  const success: boolean = JSON.parse(params.success);

  return (
    <div>
      <GameWindow
        title={success ? 'Congratulations' : 'You have been defeated'}
        footer={<Footer />}
      >
        <div />
      </GameWindow>
    </div>
  );
};

export default Finish;
