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

  // i, j 두 포인터가 서로 교차하지 않을 때까지 반복
  // 이처럼 두 개의 포인터를 이용해, 각 포인터가 서로를 향해 이동하면서
  // 문제를 해결하는 방법을 투포인터 알고리즘이라고 부름
  while (i <= j) {
    // i는 1을 더할 때마다 구출, j는 1을 뺄 때마다 구출
    if (sorted[i] + sorted[j] <= limit) i++; // 가벼운 사람은 무거운 사람과 함께 탈 수 있을 때만 구출
    j--; // 무거운 사람은 항상 구출
    answer++;
  }

  return answer;
}

const cases = [
  generateTestPair([[70, 50, 80, 50], 100], 3),
  generateTestPair([[70, 80, 50], 100], 3),
];

console.log(solution(...cases[0].input));

/**
 * [solution 시뮬레이션]
 * people = [70, 50, 80, 50] 정렬 -> [50, 50, 70, 80], limit = 100
 * i0=50, j3=80, 50+80=130 > limit100 -> j--(j3 구출)
 * i0=50, j2=70, 50+70=120 > limit100 -> j--(j2 구출)
 * i0=50, j1=50, 50+50=100 === limit100 -> i++(i0 구출), j++(j1 구출)
 * i1, j0이 돼서 서로 교차했으므로 i <= j 조건 통과 못해서 while문 종료
 */
