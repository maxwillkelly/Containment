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

  calculateUnsimulatedPersons: (residentState?: string) => number;

  calculateViralDetails: (
    turn: number,
    turnResidents: Record<number, MachineComponent[]>,
    viralDetails: ViralDetails
  ) => void;

  getViralDetails: (turn: number, residentState?: string) => ViralDetails;

  // Initialises the unsimulated property to have every resident state's unsimulated persons to be equal to its population
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
