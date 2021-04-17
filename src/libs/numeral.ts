import numeral from 'numeral';

export const formatCurrency = (value: number) => {
  const numeralString = numeral(Math.round(value))
    .format('£ 0,0 a')
    .replace('m', 'million')
    .replace('b', 'billion')
    .replace('t', 'trillion');

  return numeralString;
};

export const formatPercentage = (value: number) => {
  const numeralString = numeral(value).format('0 %');
  return numeralString;
};
