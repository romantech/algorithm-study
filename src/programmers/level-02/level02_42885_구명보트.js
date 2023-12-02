import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 사람들의 몸무게를 담은 배열 people과 구명보트의 무게 제한 limit가 매개변수로 주어질 때,
 * 모든 사람을 구출하기 위해 필요한 구명보트 개수의 최솟값 return
 * people: 1 이상 50000이하
 * 각 사람의 몸무게: 40kg 이상 240kg 이하
 * 구명보트 무게 제한 : 40kg 이상 240kg 이하
 *
 * [예시]
 * people=[70, 50, 80, 50], limit=100
 * [70], [80], [50, 50] = 3
 *
 * people=[70, 80, 50], limit=100
 * [70], [80], [50] = 3
 */

function solution(people, limit) {
  const sorted = people.sort((a, b) => a - b);
  let answer = 0;

  let i = 0; // 가벼운 사람
  let j = people.length - 1; // 무거운 사람

  // i, j 두 포인터가 서로를 넘지 않을때까지 반복
  // 이처럼 두 개의 포인터를 이용해, 각 포인터가 서로를 향해 이동하면서
  // 문제를 해결하는 방법을 투포인터 알고리즘이라고 부름
  while (i <= j) {
    // i는 1을 더할 때마다 태우고, j는 1을 뺄 때마다 태움
    if (sorted[i] + sorted[j] <= limit) i++; // 가벼운 사람은 함께 탈 수 있을때만 태움
    j--; // 무거운 사람은 항상 태움
    answer++;
  }

  return answer;
}

const cases = [
  generateTestPair([[70, 50, 80, 50], 100], 3),
  generateTestPair([[70, 80, 50], 100], 3),
];

console.log(solution(...cases[0].input));
