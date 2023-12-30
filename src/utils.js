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

export const isPrime = num => {
  if (num <= 1) return false; // 소수는 1보다 큰 자연수이므로 1은 소수가 아님
  if (num === 2) return true; // 2는 짝수중 유일하게 소수
  if (num % 2 === 0) return false; // 모든 짝수는 2로 나누어 떨어지기 때문에 소수가 아님

  // 1, 2, 짝수는 위에서 검사했으므로 3부터 2씩 증가하면서 검사
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  return true;
};

/**
 * Generates permutations of an array.
 *
 * @param {Array} arr - The array to generate permutations from.
 * @param {number} [permSize=arr.length] - The size of each permutation.
 * @param {Array} [curPerm=[]] - The current permutation being built.
 * @returns {Array} An array of permutations.
 */
export const getPermutations = (arr, permSize = arr.length, curPerm = []) => {
  if (curPerm.length === permSize) return [curPerm];
  if (arr.length === 0 || permSize === 0) return [];

  return arr.reduce((allPerms, item, i) => {
    const restItems = arr.slice(0, i).concat(arr.slice(i + 1));
    const nextPerm = curPerm.concat(item);
    return allPerms.concat(getPermutations(restItems, permSize, nextPerm));
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
