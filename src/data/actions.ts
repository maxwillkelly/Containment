import { Category } from './categories';

export type Action = {
  id: string;
  name: string;
  category: Category;
};

const actions: Array<Action> = [
  { id: '1', name: 'Universal Basic Income', category: 'Welfare' },
  { id: '2', name: 'Income Tax', category: 'Taxation' },
  { id: '3', name: 'Value Added Tax', category: 'Taxation' },
];

export default actions;
