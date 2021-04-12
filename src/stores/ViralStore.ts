/* eslint-disable no-restricted-syntax */
import create from 'zustand';
import lodash from 'lodash';
import immer from './shared/immer';
import {
  createPersonMachine,
  personMachine,
  PersonState,
} from './viral/person.machine';
import states from '../../map/geojson/states.json';

type ViralDetails = {
  unsimulated: number;
  infected: number;
  death: number;
  recovered: number;
  inoculated: number;
};

type MachineComponent = {
  machine: PersonState;
  represents: number;
};

type State = {
  rBaseline: number;
  cfr: number;

  persons: Record<string, Record<number, MachineComponent[]>>;
  unsimulated: Record<string, number>;

  personsInitialised: boolean;

  getMachines: (residentState: string, turn?: number) => MachineComponent[];
  getMachinesTotal: (residentState: string, turn?: number) => number;
  getMachinesStates: (
    residentState: string,
    turn?: number
  ) => Record<string, unknown>;
  getViralDetails: (turn: number, residentState?: string) => ViralDetails;

  setUnsimulated: () => void;

  generateOutbreak: (turn: number) => void;
  generateLocalInfection: (
    residentState: string,
    turn: number,
    infectors?: number
  ) => void;

  takeTurn: (turn: number) => void;

  reset: () => void;
};

const useViralStore = create<State>(
  immer((set, get) => ({
    rBaseline: 2,
    cfr: 0.02,

    persons: {},
    unsimulated: {},

    personsInitialised: false,

    getMachines: (residentState, turn) => {
      const stateResidents = get().persons[residentState];

      return turn === undefined
        ? Object.values(stateResidents).reduce(
            (array, r) => [...array, ...r],
            []
          )
        : stateResidents[turn];
    },

    getMachinesTotal: (residentState, turn) => {
      const stateResidents = get().persons[residentState];

      if (!stateResidents) return 0;

      if (turn === undefined)
        return Object.values(stateResidents).reduce(
          (currentLength, r) => currentLength + r.length,
          0
        );

      return stateResidents[turn].length;
    },

    getMachinesStates: (residentState, turn) => {
      const stateResidents = get().persons[residentState];

      if (!stateResidents) return {};

      const calculateMachineStates = (machineArray: MachineComponent[]) => {
        const machinesStates: Record<string, number> = {};

        for (const resident of machineArray) {
          const key = resident.machine.value.toString();
          machinesStates[key] = machinesStates[key] + 1 || 1;
        }

        return machinesStates;
      };

      if (turn === undefined) {
        const machineArray = Object.values(stateResidents).reduce(
          (array, r) => [...array, ...r],
          []
        );
        return calculateMachineStates(machineArray);
      }

      return calculateMachineStates(stateResidents[turn]);
    },

    getViralDetails: (turn, residentState) => {
      const { unsimulated, persons } = get();

      const viralDetails = {
        weekly: {
          infected: 0,
          death: 0,
          recovered: 0,
          inoculated: 0,
        },
        cumulative: {
          unsimulated: residentState
            ? unsimulated[residentState]
            : Object.values(unsimulated).reduce(
                (accumulator, current) => current + accumulator,
                0
              ),
          infected: 0,
          death: 0,
          recovered: 0,
          inoculated: 0,
        },
      };

      const calculateViralDetails = (
        turnResidents: Record<number, MachineComponent[]>
      ) => {
        if (!turnResidents) return;

        for (const [key, residents] of Object.entries(turnResidents)) {
          for (const resident of residents) {
            const { machine, represents } = resident;
            const machineStateValue = machine.value.toString();

            viralDetails.cumulative[machineStateValue] += represents;

            if (key === turn.toString()) {
              viralDetails.weekly[machineStateValue] += represents;
            }
          }
        }
      };

      if (residentState) {
        calculateViralDetails(persons[residentState]);
      } else {
        Object.values(persons).forEach((p) => calculateViralDetails(p));
      }

      return viralDetails;
    },

    setUnsimulated: () =>
      set((state) => {
        state.unsimulated = states.features.reduce((obj, s) => {
          return { ...obj, [s.properties.name]: s.properties.population };
        }, {});
      }),

    generateOutbreak: (turn) => {
      const { features } = states;
      const { generateLocalInfection } = get();

      // Selects state of outbreak
      const randomStateIndex = Math.floor(Math.random() * features.length);
      const firstOutbreakState = features[randomStateIndex].properties.name;
      console.log(firstOutbreakState);

      // Infects patient
      generateLocalInfection(firstOutbreakState, turn);

      set((state) => {
        state.personsInitialised = true;
      });
    },

    generateLocalInfection: (
      residentState,
      turn,
      infectors = get().rBaseline
    ) => {
      const newMachine = createPersonMachine();

      const patient = {
        machine: personMachine.transition(newMachine, 'Infect'),
        represents: Math.round(infectors ** 2),
      };

      // Generate 8 turns

      // Infects patient
      set((state) => {
        if (!state.persons[residentState]) state.persons[residentState] = {};

        if (!state.persons[residentState][turn])
          state.persons[residentState][turn] = [];

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
