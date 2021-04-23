/* eslint-disable @typescript-eslint/no-explicit-any */
// Based on CD.. and Yuval Pruss' stack overflow answer
// https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object

/* eslint-disable import/prefer-default-export */
export const getHighestValueKey = (obj: any) => {
  const highestKey = Object.keys(obj).reduce((a, b) =>
    obj[a] > obj[b] ? a : b
  );
  return parseInt(highestKey, 10);
};
