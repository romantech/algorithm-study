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
 * [총 경우의 수]
 * A = 1, E = 2, I = 3, O = 4, U = 5로 가정했을 때
 * 1자리로 만들 수 있는 조합: 1, 2, 3, 4, 5 = 5가지
 * 2자리로 만들 수 있는 조합: 11, 12, ..., 51, 52, 53, 54, 55 = 5^5 25가지
 * 3자리 조합: 5^3 = 125가지
 * 4자리 조합: 5^4 = 625가지
 * 5자리 조합: 5^5 = 3125가지
 * 총 만들 수 있는 조합 = 3905가지
 */

const vowelIdxMap = { A: 0, E: 1, I: 2, O: 3, U: 4 };
const vowelList = Object.keys(vowelIdxMap);

const getSortedCombs = (maxLen = 5) => {
  const make = (len, str = '') => {
    if (len === str.length) return str;
    return vowelList.flatMap((v) => make(len, str + v));
  };

  const combs = [];
  for (let i = 1; i <= maxLen; i++) combs.push(...make(i));

  return combs.sort();
};

const combs = getSortedCombs();
// console.log(combs.reduce((acc, cur, i) => acc.set(i + 1, cur), new Map()));

export function solution(word) {
  return combs.indexOf(word) + 1;
}

export function reference(word) {
  /**
   * 1~5자리의 가중치 계산. 5를 곱하는 이유는 모음 개수가 {A,E,I,O,U} 5개이기 때문
   *
   * 1번째 자리 가중치 = 1 | 예: AAAAA(5) -> AAAAE (5+1) -> AAAAI (5+1+1)
   * 2번째 자리 가중치 = 6 = 1번째 자리 가중치 * 5 + 1   | 예: AAAA- (4+6*0)   -> AAAE- (4+6*1)   -> AAAI- (4+6*2) ...
   * 3번째 자리 가중치 = 31 = 2번째 자리 가중치 * 5 + 1  | 예: AAA-- (3+31*0)  -> AAE-- (3+31*1)  -> AAI-- (3+31*2) ...
   * 4번째 자리 가중치 = 156 = 3번째 자리 가중치 * 5 + 1 | 예: AA--- (2+156*0) -> AE--- (2+156*1) -> AI--- (2+156*2) ...
   * 5번째 자리 가중치 = 781 = 4번째 자리 가중치 * 5 + 1 | 예: A---- (1+781*0) -> E---- (1+781*1) -> I---- (1+781*2) ...
   *
   * 예를들어 AAAA-는 4번째에 위치해 있고 AAAE-는 2번째 자리의 가중치 6을 더한 10번째에 위치해 있다는 의미
   */
  const weightByPosition = vowelList.reduce((acc) => {
    const prevWeight = acc[0] ?? 0;
    return [prevWeight * vowelList.length + 1].concat(acc);
  }, []); // [781, 156, 31, 6, 1]

  return [...word].reduce((totalWeight, char, i) => {
    /**
     * 각 문자를 A=0, E=1, I=2, O=3, U=4로 설정하고 각 자리의 가중치를 곱하는 방식으로 순서를 계산할 수 있음
     * 각 자리의 문자 인덱스(vowelIdxMap[char])를 가중치(weightPosition[i])에 곱하고,
     * 누적 가중치(totalWeight)에 더해준다. 마지막으로 +1을 더해서 각 자리수까지 포함시킨다.
     */
    return totalWeight + vowelIdxMap[char] * weightByPosition[i] + 1;
  }, 0);
}

export const cases = [
  generateTestPair(['AAAAE'], 6),
  generateTestPair(['AAAE'], 10),
  generateTestPair(['I'], 1563),
  generateTestPair(['EIO'], 1189),
  generateTestPair(['UUUUU'], 3905),
];
