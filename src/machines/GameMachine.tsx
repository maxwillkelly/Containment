import { Machine } from 'xstate';

export interface GameStateSchema {
  states: {
    play: Record<string, unknown>;
    paused: Record<string, unknown>;
  };
}

export type GameStateEvents = { type: 'play' | 'pause' };

const GameMachine = Machine<null, GameStateSchema, GameStateEvents>({
  id: 'game',
  initial: 'play',
  states: {
    play: {
      on: { pause: 'paused' },
    },
    paused: {
      on: { play: 'play' },
    },
  },
});

export default GameMachine;
