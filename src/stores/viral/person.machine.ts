import { Machine, State, StateMachine } from 'xstate';
import { v4 as uuid } from 'uuid';

export interface Context {
  id: string;
  infects: number;
  residentState: string;
}

export type Event =
  | { type: 'Infect' }
  | { type: 'Inoculate' }
  | { type: 'Recover' }
  | { type: 'Death' }
  | { type: 'Test' }
  | { type: 'TestExpire' }
  | { type: 'Hospitalise' }
  | { type: 'Discharge' };

export interface Schema {
  states: {
    uninfected: {
      states: {
        untested: Record<string, unknown>;
        tested: Record<string, unknown>;
      };
    };
    infected: Record<string, unknown>;
    inoculated: Record<string, unknown>;
    recovered: Record<string, unknown>;
    death: Record<string, unknown>;
  };
}

const untested: Record<string, unknown> = {
  on: {
    Test: 'tested',
  },
};

export type PersonMachine = StateMachine<Context, Schema, Event>;
export type PersonState = State<Context, Event, Schema>;

export const personMachine = Machine<Context, Schema, Event>({
  id: 'person',
  initial: 'uninfected',
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
        testing: {
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

export const createPersonMachine = (infects: number, residentState: string) =>
  personMachine.withContext({
    id: uuid(),
    infects,
    residentState,
  }).initialState;
