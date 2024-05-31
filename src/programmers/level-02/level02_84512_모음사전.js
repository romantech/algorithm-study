import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 어떤 사전에 알파벳 모음 A, E, I, O, U 만을 사용하여 만들 수 있는,
 * 길이 5 이하의 모든 단어가 수록되어 있음.
 * 사전의 첫 번째 단어는 A이고, 그 다음은 AA, ... 마지막 단어는 UUUUU
 * A, AA, AAA, AAAA, AAAAA, AAAAE, AAAAI, AAAAO, AAAAU, ...
 *
 * 1개 단어 word가 매개변수로 주어질 때, 이 단어가 사전에서 몇 번째 단어인지
 * return하는 solution 함수 완성
 *
 * [파라미터]
 * word : 길이 1 이상 5이하
 * word는 알파벳 대문자 A, E, I, O U로만 이루어져 있음
 *
 * [예시]
 * A = 1, E = 2, I = 3, O = 4, U = 5로 가정했을 때
 * 1자리로 만들 수 있는 조합: 1, 2, 3, 4, 5 = 5가지
 * 2자리로 만들 수 있는 조합: 11, 12, ..., 51, 52, 53, 54, 55 = 5^5 25가지
 * 3자리 조합: 5^3 = 125가지
 * 4자리 조합: 5^4 = 615가지
 * 5자리 조합: 5^5 = 3125가지
 * 총 만들 수 있는 조합 = 3905가지
 */

const getSortedCombs = (maxLen = 5) => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];

  const make = (len, str = '') => {
    if (len === str.length) return str;
    return vowels.flatMap(v => make(len, str + v));
  };

  const combs = [];
  for (let i = 1; i <= maxLen; i++) combs.push(...make(i));

  return combs.sort();
};

const combs = getSortedCombs();

function solution(word) {
  return combs.indexOf(word) + 1;
}

const cases = [
  generateTestPair(['AAAAE'], 6),
  generateTestPair(['AAAE'], 10),
  generateTestPair(['I'], 1563),
  generateTestPair(['EIO'], 1189),
];

cases.forEach(({ input, output }, i) => {
  const isPassed = solution(...input) === output;
  const msg = isPassed ? '통과' : '실패';
  console.log(`${i + 1}번 케이스 ${msg}`);
});
