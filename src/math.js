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
 * Generate all possible combinations of a given size from an array.
 *
 * @param {Array} arr - the input array from which combinations will be generated
 * @param {number} combSize - the size of each combination
 * @param {number} start - the starting index for generating combinations (default is 0)
 * @param {Array} curComb - the current combination being built (default is an empty array)
 * @return {Array} - an array containing all possible combinations of the given size
 */
export const getCombinations = (arr, combSize, start = 0, curComb = []) => {
  if (curComb.length === combSize) return [curComb]; // 목표 크기의 조합을 완성했을 때
  if (start === arr.length) return []; // 더이상 조합을 생성할 수 없을 때

  return arr.slice(start).reduce((allCombs, item, i) => {
    const nextComb = curComb.concat(item);
    const nextStart = start + i + 1;
    return allCombs.concat(getCombinations(arr, combSize, nextStart, nextComb));
  }, []);
};

/*
getCombinations([1, 2, 3], 2, 0, [])

sliced = [1, 2, 3], i0, nextComb = [1], nextStart = (0 + 0 + 1) = 1
  getCombinations([1, 2, 3], 2, 1, [1])
  sliced = [2, 3], i0, nextComb = [1, 2], nextStart = (1 + 0 + 1) = 2
    getCombinations([1, 2, 3], 2, 2, [1, 2]) -> return [[1, 2]]
  sliced = [2, 3], i1, nextComb = [1, 3], nextStart = (1 + 1 + 1) = 3
    getCombinations([1, 2, 3], 2, 3, [1, 3]) -> return [[1, 3]]
  return [[1, 2], [1, 3]]

sliced = [1, 2, 3], i1, nextComb = [2], nextStart = (0 + 1 + 1) = 2
  getCombinations([1, 2, 3], 2, 2, [2])
  sliced = [3], i0, nextComb = [2, 3], nextStart = (2 + 0 + 1) = 3
    getCombinations([1, 2, 3], 2, 3, [2, 3]) -> return [[2, 3]]
  return [[2, 3]]

sliced = [1, 2, 3], i2, nextComb = [3], nextStart = (0 + 2 + 1) = 3
  getCombinations([1, 2, 3], 2, 3, [3]) -> return []
  return []
*/

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
getPermutations([1, 2, 3], []) 중간 permSize 생략

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
