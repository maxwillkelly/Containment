/* eslint-disable no-restricted-syntax */
import create from 'zustand';
import lodash from 'lodash';
import immer from './shared/immer';

import { createPersonMachine, personMachine } from './viral/person.machine';

import states from '../../map/geojson/states.json';

import {
  reduceArrayElements,
  reduceArrayElementsAddition,
  reduceArrayElementsLength,
} from '../libs/reduce';

import {
  MachineComponent,
  State,
  ViralDetails,
} from '../interfaces/viralStore';

const initialViralDetails: ViralDetails = {
  weekly: {
    infected: 0,
    death: 0,
    recovered: 0,
    inoculated: 0,
  },
  cumulative: {
    unsimulated: 0,
    infected: 0,
    death: 0,
    recovered: 0,
    inoculated: 0,
  },
};

const useViralStore = create<State>(
  immer((set, get) => ({
    rBaseline: 2,
    cfr: 0.02,

    persons: {},
    unsimulated: {},

    personsInitialised: false,

    /* getMachines: (residentState, turn) => {
      const stateResidents = get().persons[residentState];

      return turn === undefined
        ? Object.values(stateResidents).reduce(
            (array, r) => [...array, ...r],
            []
          )
        : stateResidents[turn];
    }, */

    getMachinesTotal: (residentState, turn) => {
      const stateResidents = get().persons[residentState];

      if (!stateResidents) return 0;

      if (turn === undefined) {
        const stateResidentsArray = Object.values(stateResidents);

        return reduceArrayElementsLength(stateResidentsArray);
      }

      return stateResidents[turn].length;
    },

    calculateMachineStates: (machineArray) => {
      const machinesStates: Record<string, number> = {};

      for (const resident of machineArray) {
        const key = resident.machine.value.toString();
        machinesStates[key] = machinesStates[key] + 1 || 1;
      }

      return machinesStates;
    },

    getMachinesStates: (residentState, turn) => {
      const { persons, calculateMachineStates } = get();

      const stateResidents = persons[residentState];

      if (!stateResidents) return {};

      if (turn !== undefined) {
        const turnStateResidents = stateResidents[turn];

        return calculateMachineStates(turnStateResidents);
      }

      // Generates machine array to process machine states across all turns
      const stateResidentsArray = Object.values(stateResidents);

      const machineArray: MachineComponent[] = reduceArrayElements(
        stateResidentsArray
      );

      return calculateMachineStates(machineArray);
    },

    calculateUnsimulatedPersons: (residentState) => {
      const { unsimulated } = get();

      if (residentState) return unsimulated[residentState];

      const unsimulatedArray = Object.values(unsimulated);

      return reduceArrayElementsAddition(unsimulatedArray);
    },

    calculateViralDetails: (turn, turnResidents, viralDetails) => {
      if (!turnResidents) return;

      const turnResidentsArray = Object.entries(turnResidents);

      for (const [key, residents] of turnResidentsArray) {
        for (const resident of residents) {
          const { machine, represents } = resident;
          const machineStateValue = machine.value.toString();

          viralDetails.cumulative[machineStateValue] += represents;

          if (key === turn.toString()) {
            viralDetails.weekly[machineStateValue] += represents;
          }
        }
      }
    },

    getViralDetails: (turn, residentState) => {
      const {
        persons,
        calculateUnsimulatedPersons,
        calculateViralDetails,
      } = get();

      const viralDetails = lodash.cloneDeep(initialViralDetails);

      viralDetails.cumulative.unsimulated = calculateUnsimulatedPersons(
        residentState
      );

      if (residentState === undefined) {
        const personsArray = Object.values(persons);

        personsArray.forEach((p) =>
          calculateViralDetails(turn, p, viralDetails)
        );
      } else {
        const stateResidents = persons[residentState];

        calculateViralDetails(turn, stateResidents, viralDetails);
      }

      return viralDetails;
    },

    setUnsimulated: () => {
      const residentStates = states.features;

      set((state) => {
        state.unsimulated = residentStates.reduce((obj, s) => {
          const { name, population } = s.properties;

          return { ...obj, [name]: population };
        }, {});
      });
    },

    generateOutbreak: (turn) => {
      const { features } = states;
      const { generateLocalOutbreak } = get();

      // Selects state to start the outbreak
      const randomStateIndex = Math.floor(Math.random() * features.length);
      const firstOutbreakState = features[randomStateIndex].properties.name;

      // Infects first patients
      generateLocalOutbreak(firstOutbreakState, turn);

      set((state) => {
        state.personsInitialised = true;
      });
    },

    initialisesPersonsElement: (residentState, turn) => {
      set((state) => {
        if (!state.persons[residentState]) state.persons[residentState] = {};
        if (!state.persons[residentState][turn])
          state.persons[residentState][turn] = [];
      });
    },

    generateLocalOutbreak: (
      residentState,
      turn,
      infectors = get().rBaseline
    ) => {
      // Creates a person machine and infects them
      const newMachine = createPersonMachine();

      const patient = {
        machine: personMachine.transition(newMachine, 'Infect'),
        represents: Math.round(infectors ** 2),
      };

      get().initialisesPersonsElement(residentState, turn);

      // Infects patient
      set((state) => {
        state.persons[residentState][turn].push(patient);
        state.unsimulated[residentState] -= patient.represents;
      });
    },

    takeTurn: (turn) =>
      set((state) => {
        const { cfr } = state;
        const persons = lodash.cloneDeep(state.persons);

        for (const [residentState, statePersons] of Object.entries(persons)) {
          for (let i = 0; i < statePersons[turn - 1].length; i += 1) {
            const p = statePersons[turn - 1][i];

            if (p.machine.matches('infected')) {
              const { represents } = p;

              // Infects more state residents
              const newMachine = createPersonMachine();

              const patient = {
                machine: personMachine.transition(newMachine, 'Infect'),
                represents: Math.round(represents * 1.4),
                transitionedTurn: { infected: turn },
              };

              if (!state.persons[residentState][turn])
                state.persons[residentState][turn] = [];

              state.persons[residentState][turn].push(patient);
              state.unsimulated[residentState] -= patient.represents;

              // Adds new state machines representing recoveries and deaths
              const deaths = Math.round(represents * cfr);
              const recoveries = represents - deaths;

              if (deaths > 0) {
                const dead = {
                  machine: personMachine.transition(p.machine, 'Death'),
                  represents: deaths,
                };

                state.persons[residentState][turn].push(dead);
              }

              if (recoveries > 0) {
                const recovered = {
                  machine: personMachine.transition(p.machine, 'Recover'),
                  represents: recoveries,
                };

                state.persons[residentState][turn].push(recovered);
              }
            }
          }
        }
      }),

    reset: () => {
      get().setUnsimulated();

      set((state) => {
        state.persons = {};
        state.personsInitialised = false;
      });
    },
  }))
);

export default useViralStore;
