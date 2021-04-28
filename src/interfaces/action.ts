import { Category } from '../data/categories';

export type ActionInput = 'slider';
// export type ActionInput = 'slider' | 'checkbox' | 'progressiveTax';

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
