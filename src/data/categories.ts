const categories = [
  'Health',
  'Emergency',
  'Welfare',
  'Education',
  'Environment',
  'Energy',
  'Foreign Affairs',
  'Justice',
  'Transportation',
  'Taxation',
] as const;

export type Category = typeof categories[number];

export default categories;
