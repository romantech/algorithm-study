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
 * @see [참고 노트]{@link https://colorfilter.notion.site/TIL-56be7900184b4e39b600dc8046d53e13?pvs=4}
 *
 */
export const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

/**
 * 두 정수 a와 b의 최소공배수(Lowest Common Multiple, LCM)를 계산한다.
 * 배수는 어떤 수에 정수를 곱한 수를 가리킨다(어떤 수에 1배, 2배, 3배, ...)
 * 최소공배수는 두 수의 곱을 그 두 수의 최대공약수로 나눈 값과 같다.
 * 이는 a와 b의 최대공약수와 최소공배수의 곱이 a와 b를 곱한 값과 같다는 성질을 이용한 것이다.
 * lcm 함수는 내부적으로 `gcd` 함수를 호출하여 최대공약수를 계산한다.
 *
 * @param {number} a - 첫 번째 정수
 * @param {number} b - 두 번째 정수
 * @returns {number} a와 b의 최소공배수
 *
 * @example
 * lcm(12, 18) // 36 반환
 *
 * @see [참고 노트]{@link https://colorfilter.notion.site/TIL-56be7900184b4e39b600dc8046d53e13?pvs=4}
 */
export const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

export const isPrime = (num) => {
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
 * Iteratively generates combinations from an array. This method is typically
 * more performant than its recursive counterpart. For example, generating combinations of 2 elements
 * from a 1000-element array takes about 100ms iteratively, compared to 600ms functionally.
 */
export const getCombinationsIterative = (arr, combSize, start = 0, curComb = []) => {
  if (curComb.length === combSize) return [curComb];

  const results = [];
  const maxIndex = arr.length - combSize + curComb.length;

  for (let i = start; i <= maxIndex; i++) {
    const nextComb = curComb.concat(arr[i]);
    const nextStart = i + 1;
    results.push(...getCombinationsIterative(arr, combSize, nextStart, nextComb));
  }

  return results;
};

/*
getCombinationsIterative([1, 2, 3], 2, 0, [])
max = 1 (3-2+0)
i0 | nextComb = [1] | nextStart = 1
  f([1, 2, 3], 2, 1, [1])
  max = 2 (3-2+1)
  i1 | nextComb = [1, 2] | nextStart = 2
    f([1, 2, 3], 2, 2, [1, 2]) -> return [[1, 2]]
  i2 | nextComb = [1, 3] | nextStart = 3
    f([1, 2, 3], 2, 3, [1, 3]) -> return [[1, 3]]
  return [[1, 2], [1, 3]]
i1 | nextComb = [2] | nextStart = 2
  f([1, 2, 3], 2, 2, [2])
  max = 2 (3-2+1)
  i2 | nextComb = [2, 3] | nextStart = 3
    f([1, 2, 3], 2, 3, [2, 3]) -> return [[2, 3]]
  return [[2, 3]]
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

export const memoizedFactorial = (() => {
  const memo = [1, 1]; // [0!, 1!]

  return function f(num) {
    if (num < 0) throw new Error('Negative number is not allowed');
    if (memo[num] !== undefined) return memo[num];

    memo[num] = num * f(num - 1);
    return memo[num];
  };
})();
/**
 * f(5) -> memo[5] = 5 * f(4)   | memo: [1, 1, 2, 6, 24, 120]
 * f(4) -> memo[4] = 4 * f(3)   | memo: [1, 1, 2, 6, 24]
 * f(3) -> memo[3] = 3 * f(2)   | memo: [1, 1, 2, 6]
 * f(2) -> memo[2] = 2 * f(1)   | memo: [1, 1, 2]
 * f(1) -> return 1             | memo: [1, 1]
 * f(0) -> return 1             | memo: [1, 1]
 */

/**
 * Generates all possible subsets of a given array of numbers using backtracking.
 *
 * @param {number[]} nums - The array of numbers for which subsets are to be generated.
 * @returns {number[][]} - A two-dimensional array containing all possible subsets of the input array.
 * @see [Study Notes]{@link https://colorfilter.notion.site/TIL-88b6d8dc48b94753867ef0234bef34bb}
 */
export const findSubsets = (nums) => {
  const result = [];

  function generateSubsets(start, path) {
    result.push([...path]); // 현재 경로를 결과에 추가

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // 현재 원소를 경로에 추가
      generateSubsets(i + 1, path); // 다음 원소 탐색
      path.pop(); // 경로에서 마지막 원소 제거(백트래킹)
    }
  }

  generateSubsets(0, []);
  return result;
};
