import faker from 'faker';
import { Action } from '../interfaces/action';

const averageIncome = 40000;
const population = 923000000000;
const gdp = averageIncome * population;

export const actions: Action[] = [
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
      modify: (changePercentage) => 4 + 16 * changePercentage,
    },
    range: {
      step: 100,
      lowest: 100,
      highest: 25000,
      textPrepend: '£',
      textAppend: ' per year',
    },
    impact: {
      budget: (graduation) =>
        -population * 100 * 1.002 - population * 24900 * graduation,
      popularity: (graduation) => 0.03 + graduation * 0.1,
      viral: (graduation) => -0.02 * graduation,
    },
  },

  {
    id: faker.datatype.uuid(),
    name: 'Income Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: true,
    inputs: ['slider'],
    pointsCost: {
      start: 28,
      cancel: 32,
      modify: (changePercentage) => 10 + 22 * changePercentage,
    },
    range: {
      step: 1,
      lowest: 1,
      highest: 80,
      textPrepend: '',
      textAppend: '%',
    },
    impact: {
      budget: (graduation) => 0.006 * gdp + 0.006 * gdp * 79 * graduation,
      popularity: (graduation) => -0.03 - (4 * graduation) ** 2 / 100,
      viral: () => 0,
    },
  },

  {
    id: faker.datatype.uuid(),
    name: 'Value Added Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: true,
    inputs: ['slider'],
    pointsCost: {
      start: 24,
      cancel: 16,
      modify: (changePercentage) => 8 + 16 * changePercentage,
    },
    range: {
      step: 1,
      lowest: 1,
      highest: 40,
      textPrepend: '',
      textAppend: '%',
    },
    impact: {
      budget: (graduation) => 0.003 * gdp + 0.003 * 39 * gdp * graduation,
      popularity: (graduation) => -0.03 - (4 * graduation) ** 2 / 100,
      viral: () => 0,
    },
  },
  {
    id: faker.datatype.uuid(),
    name: 'Corporation Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: true,
    inputs: ['slider'],
    pointsCost: {
      start: 24,
      cancel: 28,
      modify: (changePercentage) => 6 + 22 * changePercentage,
    },
    range: {
      step: 1,
      lowest: 1,
      highest: 50,
      textPrepend: '',
      textAppend: '%',
    },
    impact: {
      budget: (graduation) => 0.0011 * gdp + 0.0011 * 49 * gdp * graduation,
      popularity: (graduation) => -0.02 - (2.5 * graduation) ** 2 / 100,
      viral: () => 0,
    },
  },
  {
    id: faker.datatype.uuid(),
    name: 'Carbon Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: false,
    inputs: ['slider'],
    pointsCost: {
      start: 20,
      cancel: 24,
      modify: (changePercentage) => 6 + 14 * changePercentage,
    },
    range: {
      step: 10,
      lowest: 10,
      highest: 200,
      textPrepend: '£',
      textAppend: ' per tonne',
    },
    impact: {
      budget: (graduation) => 0.0011 * gdp + 0.0011 * 190 * gdp * graduation,
      popularity: (graduation) => -0.01 - (3.5 * graduation) ** 2 / 100,
      viral: () => 0,
    },
  },
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
  {
    id: faker.datatype.uuid(),
    name: 'Public Healthcare',
    category: 'Health',
    turnAvailable: 0,
    enabledByDefault: true,
    inputs: ['slider'],
    pointsCost: {
      start: 32,
      cancel: 40,
      modify: (graduation) => 4 + 36 * graduation,
    },
    range: {
      step: (0.01 * gdp) / 1000000000000,
      lowest: (0.03 * gdp) / 1000000000000,
      highest: (0.15 * gdp) / 1000000000000,
      textPrepend: '£',
      textAppend: ' trillion',
    },
    impact: {
      budget: (graduation) => 0.03 * gdp + 0.12 * gdp * graduation,
      popularity: (graduation) => 0.03 + 0.07 * graduation,
      viral: (graduation) => 0.01 + 0.05 * graduation,
    },
  },
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
