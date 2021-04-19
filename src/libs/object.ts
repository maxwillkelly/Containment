/* eslint-disable import/prefer-default-export */
export const getHighestValueKey = (obj: any) => {
  const highestKey = Object.keys(obj).reduce((a, b) =>
    obj[a] > obj[b] ? a : b
  );
  return parseInt(highestKey, 10);
};
