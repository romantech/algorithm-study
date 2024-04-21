/**
 * 유클리드 호제법을 이용해 두 수의 최대공약수(Greatest Common Divisor, GCD)를 계산한다.
 * 최대공약수는 두 수 또는 그 이상의 수가 공통으로 가지는 약수 중 가장 큰 수이다.
 * 약수는 한 수를 다른 수로 나누었을 때 나머지가 0인 경우를 가리킨다.
 * 유클리드 호제법은 a를 b로 나눈 나머지(r)와 b의 최대공약수를 찾는 과정을 b가 0이될 때까지 반복한다.
 * b가 0이 되면, 그때의 a가 두 수의 최대공약수이다.
 *
 * @param {number} a - 첫 번째 정수
 * @param {number} b - 두 번째 정수
 * @returns {number} - 두 정수의 최대공약수
 *
 * @example
 * gcd(48, 18)는 다음과 같이 계산된다:
 * gcd(48, 18) -> gcd(18, 48 % 18) = gcd(18, 12)
 * gcd(18, 12) -> gcd(12, 18 % 12) = gcd(12, 6)
 * gcd(12, 6) -> gcd(6, 12 % 6) = gcd(6, 0)
 * 12 % 6이 0이므로 최대공약수는 6이다.
 *
 */
export const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
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
 * Generates all combinations of a given array with a specified combination size.
 *
 * @param {Array} arr - The array from which to generate combinations.
 * @param {number} combSize - The size of each combination.
 * @param {number} start - The index to start generating combinations from. Defaults to 0.
 * @param {Array} curComb - The current combination being generated. Defaults to an empty array.
 * @return {Array} - An array containing all combinations of the given array with the specified combination size.
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
 * Generates all possible permutations of an array.
 *
 * @param {Array} arr - The input array.
 * @param {number} permSize - The size of each permutation (default: length of array).
 * @param {Array} curPerm - The current permutation being built (default: empty array).
 * @return {Array} An array of all possible permutations.
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
