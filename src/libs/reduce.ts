// Reduces an array of arrays to a single array
export const reduceArrayElements = (arrayToReduce: Array<any>[]) =>
  arrayToReduce.reduce((array, r) => [...array, ...r], []);

// Reduces an array of arrays to a single length
export const reduceArrayElementsLength = (arrayToReduce: Array<unknown>[]) =>
  arrayToReduce.reduce((currentLength, r) => currentLength + r.length, 0);

// Calculates the sum of all numbers in an array
export const reduceArrayElementsAddition = (arrayToReduce: number[]) =>
  arrayToReduce.reduce((accumulator, current) => current + accumulator, 0);
