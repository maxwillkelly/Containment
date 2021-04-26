import faker from 'faker';
import { Category } from './categories';

export type ActionInput = 'slider' | 'checkbox' | 'progressiveTax';

export type ActionPointsCost = {
  start: number;
  cancel: number;
  modify: (changePercentage: number) => number;
};

export type ActionImpact = {
  budget: (graduation: number) => number;
  popularity: (graduation: number) => number;
  viral: (graduation: number) => number;
};

export type ActionRange = {
  step: number;
  lowest: number;
  highest: number;
  textPrepend: string;
  textAppend: string;
};

export type Action = {
  id: string;
  name: string;
  category: Category;
  description?: string;
  turnAvailable: number;
  enabledByDefault: boolean;
  inputs: ActionInput[];
  pointsCost: ActionPointsCost;
  range: ActionRange;
  impact: ActionImpact;
  graduationPercentage?: number;
};

export const actions: Array<Action> = [
  {
    id: faker.datatype.uuid(),
    name: 'Universal Basic Income',
    category: 'Welfare',
    turnAvailable: 0,
    enabledByDefault: false,
    inputs: ['slider'],
    pointsCost: {
      start: 14,
      cancel: 20,
      modify: (changePercentage) => 4 + 20 * changePercentage,
    },
    range: {
      step: 100,
      lowest: 100,
      highest: 25000,
      textPrepend: '£',
      textAppend: ' per year',
    },
    impact: {
      budget: (graduation) => -6936345000000 + -1727149905000000 * graduation,
      popularity: (graduation) => 0.03 + graduation * 0.1,
      viral: (graduation) => -0.02 * graduation,
    },
  },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Income Tax',
  //   category: 'Taxation',
  //   turnAvailable: 0,
  //   enabledByDefault: true,
  //   inputs: ['progressiveTax'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Value Added Tax',
  //   category: 'Taxation',
  //   turnAvailable: 0,
  //   enabledByDefault: true,
  //   inputs: ['slider'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Corporation Tax',
  //   category: 'Taxation',
  //   turnAvailable: 0,
  //   enabledByDefault: true,
  //   inputs: ['slider'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Carbon Tax',
  //   category: 'Taxation',
  //   turnAvailable: 0,
  //   enabledByDefault: false,
  //   inputs: ['slider'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Defence Production Act',
  //   category: 'Constitution',
  //   turnAvailable: 0,
  //   enabledByDefault: false,
  //   inputs: ['checkbox'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'State of Emergency',
  //   category: 'Constitution',
  //   turnAvailable: 0,
  //   enabledByDefault: false,
  //   inputs: ['checkbox'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Public Healthcare',
  //   category: 'Health',
  //   turnAvailable: 0,
  //   enabledByDefault: true,
  //   inputs: ['slider'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Unemployment Benefit',
  //   category: 'Welfare',
  //   turnAvailable: 0,
  //   enabledByDefault: true,
  //   inputs: ['slider'],
  // },
  // {
  //   id: faker.datatype.uuid(),
  //   name: 'Child Benefit',
  //   category: 'Health',
  //   turnAvailable: 0,
  //   enabledByDefault: false,
  //   inputs: ['slider'],
  // },
];

export default actions;
