import { Category } from './categories';

export type Action = {
  id: string;
  name: string;
  turnAvailable: number;
  category: Category;
};

const actions: Array<Action> = [
  {
    id: '1',
    name: 'Universal Basic Income',
    turnAvailable: 0,
    category: 'Welfare',
  },
  { id: '2', name: 'Income Tax', turnAvailable: 0, category: 'Taxation' },
  { id: '3', name: 'Value Added Tax', turnAvailable: 0, category: 'Taxation' },
  { id: '3a', name: 'Corporation Tax', turnAvailable: 0, category: 'Taxation' },
  { id: '3b', name: 'Carbon Tax', turnAvailable: 0, category: 'Taxation' },
  {
    id: '4',
    name: 'Defence Production Act',
    turnAvailable: 0,
    category: 'Constitution',
  },
  {
    id: '5',
    name: 'State of Emergency',
    turnAvailable: 0,
    category: 'Constitution',
  },
  { id: '6', name: 'Public Healthcare', turnAvailable: 0, category: 'Health' },
  {
    id: '7',
    name: 'Unemployment Benefit',
    turnAvailable: 0,
    category: 'Welfare',
  },
  { id: '8', name: 'Child Benefit', turnAvailable: 0, category: 'Health' },
];

export default actions;
