import { v4 as uuid } from 'uuid';
import { Category } from './categories';

export type Action = {
  id: string;
  name: string;
  category: Category;
  turnAvailable: number;
  enabledByDefault: boolean;
};

export const actions: Array<Action> = [
  {
    id: uuid(),
    name: 'Universal Basic Income',
    category: 'Welfare',
    turnAvailable: 0,
    enabledByDefault: true,
  },
  {
    id: uuid(),
    name: 'Income Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: true,
  },
  {
    id: uuid(),
    name: 'Value Added Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: true,
  },
  {
    id: uuid(),
    name: 'Corporation Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: true,
  },
  {
    id: uuid(),
    name: 'Carbon Tax',
    category: 'Taxation',
    turnAvailable: 0,
    enabledByDefault: false,
  },
  {
    id: uuid(),
    name: 'Defence Production Act',
    category: 'Constitution',
    turnAvailable: 0,
    enabledByDefault: false,
  },
  {
    id: uuid(),
    name: 'State of Emergency',
    category: 'Constitution',
    turnAvailable: 0,
    enabledByDefault: false,
  },
  {
    id: uuid(),
    name: 'Public Healthcare',
    category: 'Health',
    turnAvailable: 0,
    enabledByDefault: true,
  },
  {
    id: uuid(),
    name: 'Unemployment Benefit',
    category: 'Welfare',
    turnAvailable: 0,
    enabledByDefault: true,
  },
  {
    id: uuid(),
    name: 'Child Benefit',
    category: 'Health',
    turnAvailable: 0,
    enabledByDefault: false,
  },
];

export default actions;
