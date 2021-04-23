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
  reduceArrayToHighestElement,
} from '../libs/reduce';

import {
  MachineComponent,
  State,
  ViralDetails,
} from '../interfaces/viralStore';
import { StateProps } from '../interfaces/states';

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
    infectionExpansion: 1.4,
    cfr: 0.02,
    rangeFactor: {
      short: 0.005,
      long: 0.001,
    },
    minimumInfections: 6,

    persons: {},
    unsimulated: {},

    personsInitialised: false,

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

    selectRandomState: (excludes) => {
      const { selectRandomState } = get();
      const { features } = states;

      const randomStateIndex = Math.floor(Math.random() * features.length);
      const randomState = features[randomStateIndex].properties;

      // Picks another state if it has chosen the excluded resident state
      if (randomState.name === excludes) return selectRandomState(excludes);

      return randomState;
    },

    selectCloseState: (centreState) => {
      const { features } = states;

      const statesProps: StateProps[] = features.map((s) => s.properties);

      // Finds highest feature id
      const stateFids = statesProps.map((s) => s.fid);
      const highestFid = reduceArrayToHighestElement(stateFids);

      const centreStateProps = statesProps.find((s) => s.name === centreState);

      if (centreStateProps === undefined)
        throw new Error(`centreState ${centreState} doesn't exist`);

      const { fid } = centreStateProps;

      const selectedFid =
        (Math.round(Math.random() * 3 + fid) % (highestFid - 1)) + 1;

      const closeState = statesProps.find((s) => s.fid === selectedFid);

      if (closeState === undefined)
        throw new Error(`selectedFid ${selectedFid} doesn't exist`);

      return closeState;
    },

    generateOutbreak: (turn) => {
      const { selectRandomState, generateLocalOutbreak } = get();

      // Selects state to start the outbreak
      const firstOutbreakState = selectRandomState().name;

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

      const patient: MachineComponent = {
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

    createInfectedMachine: (newMachine, infects) => {
      return {
        machine: personMachine.transition(newMachine, 'Infect'),
        represents: infects,
      };
    },

    createRecoveredMachine: (machineComponent, recoveries) => {
      return {
        machine: personMachine.transition(machineComponent.machine, 'Recover'),
        represents: recoveries,
      };
    },

    createDeadMachine: (machineComponent, deaths) => {
      return {
        machine: personMachine.transition(machineComponent.machine, 'Death'),
        represents: deaths,
      };
    },

    storePerson: (machineComponent, residentState, turn) => {
      const { initialisesPersonsElement } = get();

      initialisesPersonsElement(residentState, turn);

      set((state) => {
        state.persons[residentState][turn].push(machineComponent);
      });
    },

    storeNewPerson: (machineComponent, residentState, turn) => {
      const { storePerson } = get();

      storePerson(machineComponent, residentState, turn);

      set((state) => {
        state.unsimulated[residentState] -= machineComponent.represents;
      });
    },

    addsCommunityInfections: (machineComponent, residentState, turn) => {
      const {
        infectionExpansion,
        createInfectedMachine,
        storeNewPerson,
      } = get();

      const { represents } = machineComponent;

      const infects = Math.round(represents * infectionExpansion);

      const newMachine = createPersonMachine();

      const patient = createInfectedMachine(newMachine, infects);

      storeNewPerson(patient, residentState, turn);
    },

    addsShortRangeInfections: (machineComponent, residentState, turn) => {
      const {
        rangeFactor,
        minimumInfections,
        selectCloseState,
        createInfectedMachine,
        storeNewPerson,
      } = get();

      const { represents } = machineComponent;
      const { short } = rangeFactor;

      const infects = Math.round(represents * short * Math.random());

      if (infects < minimumInfections) return;

      const newMachine = createPersonMachine();
      const patient = createInfectedMachine(newMachine, infects);
      const closeState = selectCloseState(residentState).name;

      storeNewPerson(patient, closeState, turn);
    },

    addsLongRangeInfections: (machineComponent, residentState, turn) => {
      const {
        rangeFactor,
        minimumInfections,
        selectRandomState,
        createInfectedMachine,
        storeNewPerson,
      } = get();

      const { represents } = machineComponent;
      const { long } = rangeFactor;

      const infects = Math.round(represents * long * Math.random());

      if (infects < minimumInfections) return;

      const newMachine = createPersonMachine();
      const patient = createInfectedMachine(newMachine, infects);
      const randomState = selectRandomState(residentState).name;

      storeNewPerson(patient, randomState, turn);
    },

    addsCrossBorderInfections: (machineComponent, residentState, turn) => {
      const { addsShortRangeInfections, addsLongRangeInfections } = get();

      addsShortRangeInfections(machineComponent, residentState, turn);
      addsLongRangeInfections(machineComponent, residentState, turn);
    },

    updateInfectedPerson: (machineComponent, residentState, turn) => {
      const {
        cfr,
        addsCommunityInfections,
        addsCrossBorderInfections,
        createDeadMachine,
        createRecoveredMachine,
        storePerson,
      } = get();

      const { represents } = machineComponent;

      // Infects more state residents
      addsCommunityInfections(machineComponent, residentState, turn);

      // Infects residents in other states
      addsCrossBorderInfections(machineComponent, residentState, turn);

      // Moves infected last turn to either dead or recovered
      const deaths = Math.round(represents * cfr);
      const recoveries = represents - deaths;

      // Adds new state machines representing recoveries and deaths
      if (deaths > 0) {
        const dead = createDeadMachine(machineComponent, deaths);
        storePerson(dead, residentState, turn);
      }

      if (recoveries > 0) {
        const recovered = createRecoveredMachine(machineComponent, recoveries);
        storePerson(recovered, residentState, turn);
      }
    },

    takeTurn: (turn) => {
      const { updateInfectedPerson, persons } = get();

      const personsCopy = lodash.cloneDeep(persons);
      const personsArray = Object.entries(personsCopy);

      for (const [residentState, statePersons] of personsArray) {
        // Gets persons from the last turn
        const turnPersons = statePersons[turn - 1];

        for (const machineComponent of turnPersons) {
          const { machine } = machineComponent;

          if (machine.matches('infected'))
            updateInfectedPerson(machineComponent, residentState, turn);
        }
      }
    },

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
