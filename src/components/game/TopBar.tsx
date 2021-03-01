import React from 'react';
import { Link } from 'react-router-dom';
import { useMachine } from '@xstate/react';
import { GiPauseButton } from 'react-icons/gi';
import GameMachine from '../../machines/GameMachine';

// interface PauseButtonProps {
//   gameMachine: any;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PauseButton: React.FC = () => {
  const [current, send] = useMachine(GameMachine);

  return (
    // <button type="button" onClick={() => send({ type: 'pause' })}>
    <Link className="p-3" to="/">
      <GiPauseButton className="text-2xl" />
      {/* <pre>{current.value}</pre> */}
    </Link>
    // </button>
  );
};

// interface Props {
//   gameMachine: any;
// }

const TopBar: React.FC = () => {
  return (
    <nav className="mx-auto dark:bg-gray-700 dark:text-gray-200">
      <div className="flex flex-row justify-between">
        <PauseButton />
        <h1>Y</h1>
      </div>
    </nav>
  );
};

export default TopBar;
