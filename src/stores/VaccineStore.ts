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

import { capitalise } from '../libs/string';

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
  getPhaseString: (vaccine: Vaccine) => string;
  getPhaseDetails: (vaccine: Vaccine) => PhaseDetails;

  orderVaccines: (vaccine: Vaccine, orders: number) => void;

  generatePrice: () => number;
  generateNextTransition: (vaccine: Vaccine, turn: number) => number;

  addCandidate: (turn: number) => void;
  addCandidates: (turn: number) => void;

  transitionVaccine: (vaccine: Vaccine, turn: number) => void;
  sortVaccines: () => void;
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

    getPhaseString: (vaccine) => {
      const { getPhase } = get();

      const phase = getPhase(vaccine);

      if (Number.isNaN(phase)) {
        const finishState = vaccine.machine.value;
        return capitalise(finishState);
      }

      return `Phase ${phase}`;
    },

    getPhaseDetails: (vaccine) => {
      const { stageDetails, getPhase } = get();

      const phase = getPhase(vaccine);
      const phaseTime = stageDetails[`phase${phase}`];

      if (phaseTime === undefined)
        throw new Error(`Phase Time is undefined for phase ${phase}`);

      return phaseTime;
    },

    orderVaccines: (vaccine, orders) => {
      const { vaccines } = get();

      const vaccineCopy = lodash.cloneDeep(vaccine);
      vaccineCopy.orders += orders;

      const index = vaccines.findIndex((v) => v.id === vaccine.id);

      set((state) => {
        state.vaccines.splice(index, 1);
        state.vaccines.push(vaccineCopy);
      });
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

    sortVaccines: () => {
      const { vaccines } = get();

      const sortedVaccines = lodash.cloneDeep(vaccines);

      sortedVaccines.sort((first, second) => {
        const phaseOrder = [
          'Failed',
          'Phase 1',
          'Phase 2',
          'Phase 3',
          'Approved',
        ];

        const { getPhaseString } = get();

        if (first.machine.value === second.machine.value) return 0;

        const firstPhase = getPhaseString(first);
        const secondPhase = getPhaseString(second);

        const firstIndex = phaseOrder.findIndex((p) => p === firstPhase);
        const secondIndex = phaseOrder.findIndex((p) => p === secondPhase);

        if (firstIndex === -1)
          throw new Error(`Sort Index ${firstPhase} invalid`);

        if (secondIndex === -1)
          throw new Error(`Sort Index ${secondPhase} invalid`);

        return secondIndex - firstIndex;
      });

      set((state) => {
        state.vaccines = sortedVaccines;
      });
    },

    advanceTurn: (turn) => {
      const {
        vaccines,
        transitionVaccine,
        addCandidates,
        sortVaccines,
      } = get();

      const vaccinesCopy = lodash.cloneDeep(vaccines);

      for (const v of vaccinesCopy) {
        if (v.machine.done) break;
        transitionVaccine(v, turn);
      }

      set((state) => {
        state.vaccines = vaccinesCopy;
      });

      addCandidates(turn);
      sortVaccines();
    },

    reset: () =>
      set((state) => {
        state.vaccines = [];
      }),
  }))
);

export default useVaccineStore;
