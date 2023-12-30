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

/**
 * Generates a test pair object that includes an input, an output.
 * Each element of the input array represents a separate parameter for the test case.
 *
 * @param {Array} input - The input array, where each element represents a distinct parameter of the test case.
 * @param {any} output - The output value, which can be of any type.
 * @throws {Error} If the input is not an array.
 * @throws {Error} If the output is undefined.
 * @return {Object} The test pair object containing the input, output.
 */
export const generateTestPair = (input, output) => {
  if (!Array.isArray(input)) throw new Error('Input must be an array');
  if (output === undefined) throw new Error('Output must not be undefined');
  return { input, output };
};

/**
 * Generates all possible permutations of the given elements.
 *
 * @param {Array} elements - The elements to generate permutations for.
 * @param {Array} permutation - The current permutation being built. (Optional)
 * @return {Array} An array of all possible permutations.
 */
export const getPermutations = (elements, permutation = []) => {
  if (elements.length === 0) return [permutation];

  return elements.reduce((results, currentEl, i) => {
    const remaining = elements.slice(0, i).concat(elements.slice(i + 1));
    const newPermutation = permutation.concat(currentEl);
    return results.concat(getPermutations(remaining, newPermutation));
  }, []);
};

/*
getPermutations([1, 2, 3], [])

r = [2, 3], p = [1]
  getPermutations([2, 3], [1])
  r = [3], p = [1, 2]
    getPermutations([3], [1, 2])
    r = [], p = [1, 2, 3]
      getPermutations([], [1, 2, 3]) -> return [[1, 2, 3]]
  r = [2], p = [1, 3]
    getPermutations([2], [1, 3])
    r = [], p = [1, 3, 2]
      getPermutations([], [1, 3, 2]) -> return [[1, 3, 2]]
  return [[1, 2, 3], [1, 3, 2]]

r = [1, 3], p = [2]
  getPermutations([1, 3], [2])
  r = [3], p = [2, 1]
    getPermutations([3], [2, 1])
    r = [], p = [2, 1, 3]
      getPermutations([], [2, 1, 3]) -> return [[2, 1, 3]]
  r = [1], p = [2, 3]
    getPermutations([1], [2, 3])
    r = [], p = [2, 3, 1]
      getPermutations([], [2, 3, 1]) -> return [[2, 3, 1]]
  return [[2, 1, 3], [2, 3, 1]]

r = [1, 2], p = [3]
  getPermutations([1, 2], [3])
  r = [2], p = [3, 1]
    getPermutations([2], [3, 1])
    r = [], p = [3, 1, 2]
      getPermutations([], [3, 1, 2]) -> return [[3, 1, 2]]
  r = [1], p = [3, 2]
    getPermutations([1], [3, 2])
    r = [], p = [3, 2, 1]
      getPermutations([], [3, 2, 1]) -> return [[3, 2, 1]]
  return [[3, 1, 2], [3, 2, 1]]
*/
