import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 0또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수 반환
 *
 * [파라미터]
 * numbers : 길이 1 이상 100,000 이하
 * 각 요소는 0 이상 1,000 이하
 *
 * [예시]
 * numbers: [6, 10, 2]
 * 만들 수 있는 수 : 6102, 6210, 1062, 1026, 2610, 2106
 * 가장 큰 수 : 6210
 */

function solution(numbers) {
  if (numbers.every((n) => n === 0)) return '0';

  const sorted = numbers.sort((a, b) => {
    // localeCompare는 로케일의 사전 순으로 비교하므로 '10', '2'를 비교할 때
    // 가장 앞 글자 '1'이 '2'보다 작으므로 결과적으로 '10'이 '2'보다 작다고 판단함

    // '610', '106' -> '106'.localeCompare('610') -> -1 음수이므로 순서 교환 안함
    // '62', '26' -> '26'.localeCompare('62') -> -1 음수이므로 순서 교환 안함
    // '102', '210' -> '210'.localeCompare('102') -> 1 양수이므로 순서 교환

    const firstCombo = '' + a + b;
    const secondCombo = '' + b + a;
    return secondCombo.localeCompare(firstCombo); // 내림차순 정렬
  });

  return sorted.join('');
}

const cases = [
  generateTestPair([[6, 10, 2]], '6210'),
  generateTestPair([[3, 30, 34, 5, 9]], '9534330'),
];

solution(...cases[0].input);
