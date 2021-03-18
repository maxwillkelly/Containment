import { Machine, StateMachine } from 'xstate';
import { v4 as uuid } from 'uuid';

type Event =
  | { type: 'Infect' }
  | { type: 'Inoculate' }
  | { type: 'Recover' }
  | { type: 'Death' }
  | { type: 'Test' }
  | { type: 'TestExpire' }
  | { type: 'Hospitalise' }
  | { type: 'Discharge' };

interface Schema {
  states: {
    uninfected: Record<string, unknown>;
    infected: Record<string, unknown>;
    inoculated: Record<string, unknown>;
    recovered: Record<string, unknown>;
    death: Record<string, unknown>;
  };
}

interface Context {
  id: string;
  infects: number;
  state: string;
}

const untested: Record<string, unknown> = {
  on: {
    Test: 'tested',
  },
};

export type PersonMachine = StateMachine<Context, Schema, Event>;

const createPersonMachine = (infects: number, state: string) =>
  Machine<Context, Schema, Event>({
    id: 'person',
    initial: 'uninfected',
    context: {
      id: uuid(),
      infects,
      state,
    },
    states: {
      uninfected: {
        on: {
          Infect: 'infected',
          Inoculate: 'inoculated',
        },
        initial: 'untested',
        states: {
          untested,
          tested: {
            on: {
              TestExpire: 'untested',
            },
          },
        },
      },
      infected: {
        on: {
          Recover: 'recovered',
          Death: 'death',
        },
        type: 'parallel',
        states: {
          test: {
            initial: 'untested',
            states: {
              untested,
              tested: {},
            },
          },
          symptoms: {
            initial: 'mild',
            states: {
              mild: {
                on: {
                  Hospitalise: 'hospitalised',
                },
              },
              hospitalised: {
                on: {
                  Discharge: 'mild',
                },
              },
            },
          },
        },
      },
      inoculated: {},
      recovered: {
        on: {
          Inoculate: 'inoculated',
        },
      },
      death: {},
    },
  });

export default createPersonMachine;
