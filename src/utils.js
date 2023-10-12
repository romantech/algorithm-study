export const makeRandomArr = (max = 10, len = 10) => {
  return Array.from(Array(len)).map(() => Math.floor(Math.random() * max + 1));
};

export const swap = (arr, a, b) => {
  /* const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp; */
  [arr[a], arr[b]] = [arr[b], arr[a]];
};

export const Compare = { LESS_THAN: -1, BIGGER_THAN: 1 };

export const defaultCompare = (a, b) => {
  if (a === b) return 0;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

export const measureExecutionTime = (fn, ...args) => {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();

  const executionTime = (end - start).toFixed(2);
  return { result, executionTime };
};
