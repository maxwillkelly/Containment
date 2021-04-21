import { PersonState } from '../stores/viral/person.machine';

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

export type State = {
  rBaseline: number;
  cfr: number;

  persons: Record<string, Record<number, MachineComponent[]>>;
  unsimulated: Record<string, number>;

  personsInitialised: boolean;

  // getMachines: (residentState: string, turn?: number) => MachineComponent[];

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

  // Initialises the unsimulated property to have every resident state's unsimulated persons to be equal to its population
  setUnsimulated: () => void;

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

  takeTurn: (turn: number) => void;

  reset: () => void;
};
