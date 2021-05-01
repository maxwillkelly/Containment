import numeral from 'numeral';

export const formatNumber = (value: number) =>
  numeral(Math.round(value)).format('0,0');

export const formatCurrency = (value: number) => {
  const numeralString = numeral(Math.round(value))
    .format('$ 0,0.0 a')
    .replace('$', '£')
    .replace('m', 'million')
    .replace('b', 'billion')
    .replace('t', 'trillion');

  return numeralString;
};

export const formatPercentage = (value: number) => numeral(value).format('0 %');
