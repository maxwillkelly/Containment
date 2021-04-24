import { Action } from '../data/actions';
import { PersonState } from '../stores/viral/person.machine';
import { StateProps } from './states';

export type ViralDetails = {
  weekly: {
    infected: number;
    death: number;
    recovered: number;
    inoculated: number;
  };
  cumulative: {
    unsimulated: number;
    infected: number;
    death: number;
    recovered: number;
    inoculated: number;
  };
};

export type MachineComponent = {
  machine: PersonState;
  represents: number;
};

export type RangeFactor = {
  short: number;
  long: number;
};

export type State = {
  rBaseline: number;
  infectionExpansion: number;
  cfr: number;
  rangeFactor: RangeFactor;
  minimumInfections: number;

  persons: Record<string, Record<number, MachineComponent[]>>;
  unsimulated: Record<string, number>;
  actionModifiers: Record<number, Record<string, number>>;

  personsInitialised: boolean;

  // Gets the total number of machines in a residentState either in a specific turn or across all turns
  getMachinesTotal: (residentState: string, turn?: number) => number;

  // Calculates the number of MachineComponents in each state and returns them as an object
  calculateMachineStates: (
    machineArray: MachineComponent[]
  ) => Record<string, number>;

  // Gets the total number of machines in each state
  getMachinesStates: (
    residentState: string,
    turn?: number
  ) => Record<string, unknown>;

  // Calculates the number of unsimulated persons in a resident state or nationally
  calculateUnsimulatedPersons: (residentState?: string) => number;

  calculateViralDetails: (
    turn: number,
    turnResidents: Record<number, MachineComponent[]>,
    viralDetails: ViralDetails
  ) => void;

  getViralDetails: (turn: number, residentState?: string) => ViralDetails;

  addActionModifier: (action: Action, turn: number) => void;
  editActionModifier: (action: Action, turn: number) => void;
  removeActionModifier: (action: Action, turn: number) => void;

  // Initialises the unsimulated property to have every resident state's unsimulated persons to be equal to its population
  setUnsimulated: () => void;

  // Returns a random state with its properties
  selectRandomState: (excludes?: string) => StateProps;

  // Returns a state close to centreState with its properties
  selectCloseState: (centreState: string) => StateProps;

  // Starts an outbreak in a random resident state
  generateOutbreak: (turn: number) => void;

  // Initialises appropriate properties on persons if they haven't been already
  initialisesPersonsElement: (residentState: string, turn: number) => void;

  // Generates an outbreak in a resident state
  generateLocalOutbreak: (
    residentState: string,
    turn: number,
    infectors?: number
  ) => void;

  createInfectedMachine: (
    newMachine: PersonState,
    infects: number
  ) => MachineComponent;

  createRecoveredMachine: (
    machineComponent: MachineComponent,
    recoveries: number
  ) => MachineComponent;

  createDeadMachine: (
    machineComponent: MachineComponent,
    deaths: number
  ) => MachineComponent;

  //
  storePerson: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  //
  storeNewPerson: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  addsCommunityInfections: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  addsShortRangeInfections: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  addsLongRangeInfections: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  addsCrossBorderInfections: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  //
  updateInfectedPerson: (
    machineComponent: MachineComponent,
    residentState: string,
    turn: number
  ) => void;

  takeTurn: (turn: number) => void;

  setActionModifiers: () => void;

  reset: () => void;
};
