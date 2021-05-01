import { Machine, State, StateMachine } from 'xstate';

export type Event = { type: 'Advance' } | { type: 'Fail' };

export interface Schema {
  states: {
    phase1: Record<string, unknown>;
    phase2: Record<string, unknown>;
    phase3: Record<string, unknown>;
    approved: Record<string, unknown>;
    failed: Record<string, unknown>;
  };
}

export type VaccineMachine = StateMachine<undefined, Schema, Event>;
export type VaccineState = State<undefined, Event, Schema>;

export const vaccineMachine = Machine<undefined, Schema, Event>({
  id: 'vaccine',
  initial: 'phase1',
  states: {
    phase1: {
      on: {
        Advance: 'phase2',
        Fail: 'failed',
      },
    },
    phase2: {
      on: {
        Advance: 'phase3',
        Fail: 'failed',
      },
    },
    phase3: {
      on: {
        Advance: 'approved',
        Fail: 'failed',
      },
    },
    approved: {
      type: 'final',
    },
    failed: {
      type: 'final',
    },
  },
});

export const createVaccineMachine = () => vaccineMachine.initialState;
