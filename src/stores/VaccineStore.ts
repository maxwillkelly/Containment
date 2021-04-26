/* eslint-disable no-restricted-syntax */
import create from 'zustand';
import faker from 'faker';
import lodash from 'lodash';
import immer from './shared/immer';

import {
  createVaccineMachine,
  vaccineMachine,
  VaccineState,
} from './vaccine/vaccine.machine';

export type Vaccine = {
  id: string;
  name: string;
  price: number;
  machine: VaccineState;
  orders: number;
  received: number;
  nextTransition: number;
  production?: (turnApproved: number) => number;
};

export type PhaseDetails = {
  min: number;
  max: number;
  chance: number;
};

export type StageDetails = {
  phase1: PhaseDetails;
  phase2: PhaseDetails;
  phase3: PhaseDetails;
};

type State = {
  candidatesAppear: number;
  candidateChance: number;
  vaccines: Vaccine[];
  stageDetails: StageDetails;

  getPhase: (vaccine: Vaccine) => number;
  getPhaseDetails: (vaccine: Vaccine) => PhaseDetails;

  generatePrice: () => number;
  generateNextTransition: (vaccine: Vaccine, turn: number) => number;

  addCandidate: (turn: number) => void;
  addCandidates: (turn: number) => void;

  transitionVaccine: (vaccine: Vaccine, turn: number) => void;
  advanceTurn: (turn: number) => void;
  reset: () => void;
};

const useVaccineStore = create<State>(
  immer((set, get) => ({
    candidatesAppear: 6,
    candidateChance: 0.3,
    vaccines: [],

    stageDetails: {
      phase1: { min: 3, max: 8, chance: 0.5 },
      phase2: { min: 6, max: 15, chance: 0.4 },
      phase3: { min: 9, max: 30, chance: 0.3 },
    },

    getPhase: (vaccine) => {
      const state = vaccine.machine.value;
      const phaseString = state[state.length - 1];
      const phase = parseInt(phaseString, 10);
      return phase;
    },

    getPhaseDetails: (vaccine) => {
      const { stageDetails, getPhase } = get();

      const phase = getPhase(vaccine);
      const phaseTime = stageDetails[`phase${phase}`];

      if (phaseTime === undefined)
        throw new Error(`Phase Time is undefined for phase ${phase}`);

      return phaseTime;
    },

    generatePrice: () => Math.round(Math.random() * 40) + 3,

    generateNextTransition: (vaccine, turn) => {
      if (vaccine.machine.done) return 0;

      const phaseDetails = get().getPhaseDetails(vaccine);

      const { min, max } = phaseDetails;
      const range = max - min;
      const phaseLength = Math.round(range * Math.random()) + min;

      const nextTransition = turn + phaseLength;
      return nextTransition;
    },

    addCandidate: (turn) => {
      const { generatePrice, generateNextTransition } = get();

      const candidate: Vaccine = {
        id: faker.datatype.uuid(),
        name: faker.name.lastName(),
        price: generatePrice(),
        nextTransition: -1,
        orders: 0,
        received: 0,
        machine: createVaccineMachine(),
      };

      candidate.nextTransition = generateNextTransition(candidate, turn);

      set((state) => {
        state.vaccines.push(candidate);
      });
    },

    addCandidates: (turn) => {
      const { candidatesAppear, candidateChance, addCandidate } = get();

      const random = Math.random();

      if (turn >= candidatesAppear && random > candidateChance)
        addCandidate(turn);
    },

    transitionVaccine: (vaccine, turn) => {
      const { getPhaseDetails, generateNextTransition } = get();
      const { nextTransition, machine } = vaccine;

      if (turn !== nextTransition) return;

      const random = Math.random();
      const phaseDetails = getPhaseDetails(vaccine);
      const event = phaseDetails.chance > random ? 'Advance' : 'Fail';

      vaccine.machine = vaccineMachine.transition(machine, event);
      vaccine.nextTransition = generateNextTransition(vaccine, turn);
    },

    advanceTurn: (turn) => {
      const { vaccines, transitionVaccine, addCandidates } = get();

      const vaccinesCopy = lodash.cloneDeep(vaccines);

      for (const v of vaccinesCopy) {
        if (v.machine.done) break;
        transitionVaccine(v, turn);
      }

      set((state) => {
        state.vaccines = vaccinesCopy;
      });

      addCandidates(turn);
    },

    reset: () =>
      set((state) => {
        state.vaccines = [];
      }),
  }))
);

export default useVaccineStore;
