import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * n 개의 양의 정수들을 순서를 바꾸지 않고 더하거나 빼서 타겟 넘버를 만들 수 있는 방법의 수 반환
 *
 * [파라미터]
 * number: 2개 이상, 20개 이하, 각 숫자는 1 이상 50 이하
 * target: 1 이상 1000 이하
 *
 * [예시]
 * numbers: [1, 1, 1, 1, 1] | target: 3
 * 1. -1 +1 +1 +1 +1 = 3
 * 2. +1 -1 +1 +1 +1 = 3
 * 3. +1 +1 -1 +1 +1 = 3
 * 4. +1 +1 +1 -1 +1 = 3
 * 5. +1 +1 +1 +1 -1 = 3
 * return 5
 *
 * numbers: [4, 1, 2, 1] | target: 4
 * 1. +4 +1 -2 +1 = 4
 * 2. +4 -1 +2 -1 = 4
 * return 2
 */

/**
 * {@link https://drive.google.com/file/d/1NLkmppujLCwRMGDR_OQBuLPuKwaDAYd7/view 알고리즘 동작 과정 시각화 이미지}
 *
 * 시간 복잡도: O(2^N) - N은 numbers 배열 길이.
 * 배열 각 요소마다 더하기/빼기 두 가지 선택이 있으므로 이진 트리로 모든 경우의 수 계산.
 * numbers 배열에 n개의 요소가 있다면, 트리는 n레벨까지 깊어짐.
 * 각 레벨마다 가능한 경우의 수는 이전 레벨의 2배 이므로 모든 경우의 수(리프 노드 개수)는 2^N.
 */
export function solution(numbers, target) {
  const dfs = (index, sum) => {
    if (index === numbers.length) return sum === target ? 1 : 0; // Base Case : 모든 숫자를 사용했을 때

    const add = dfs(index + 1, sum + numbers[index]); // 현재 숫자를 더하는 경우의 수를 재귀적으로 계산
    const sub = dfs(index + 1, sum - numbers[index]); // 현재 숫자를 빼는 경우의 수를 재귀적으로 계산

    return add + sub; // 더하기/빼기 경우의 수를 합산해서 반환
  };

  return dfs(0, 0); // 모든 가능한 숫자 조합 탐색
}

export const cases = [
  generateTestPair([[1, 1, 1, 1, 1], 3], 5),
  generateTestPair([[4, 1, 2, 1], 4], 2),
];
