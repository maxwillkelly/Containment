const categories = [
  'Health',
  'Constitution',
  'Welfare',
  'Education',
  'Environment',
  'Energy',
  'Foreign Affairs',
  'Crime',
  'Transportation',
  'Taxation',
] as const;

export type Category = typeof categories[number];

export default categories;
