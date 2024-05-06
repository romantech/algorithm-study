import { generateTestPair } from '../../utils.js';
import { getCombinationsIterative } from '../../math.js';

/**
 * [문제 분석]
 * 기존 단품으로만 제공하던 메뉴를 조합해서 코스요리 형태로 재구성하려고 함
 * - 각 손님들이 주문할 때 가장 많이 주문한 단품 메뉴들을 코스 요리로 구성
 * - 코스요리 메뉴는 최소 2가지 이상의 단품 메뉴로 구성
 * - 최소 2명 이상의 손님으로부터 주문된 단품 메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함
 * 1번 손님: [A, B, C, F, G]
 * 2번 손님: [A, C]
 * 3번 손님: [C, D, E]
 * 4번 손님: [A, C, D, E]
 * 5번 손님: [B, C, F, G]
 * 6번 손님: [A, C, D, E, H]
 *
 * 각 손님이 주문한 요리의 조합을 생성해서 다른 손님이 주문한 메뉴와 비교해서 동일한지 확인
 * 요리 2개 코스: [A, C]
 * 요리 3개 코스: [C, D, E]
 * 요리 4개 코스: [A, C, D, E], [B, C, F, G]
 *
 * [제한사항]
 * orders: 손님이 주문한 단품 메뉴들이 문자열 형식으로 담긴 2 이상 20 이하 배열
 * orders의 각 요소는 2 이상 10 이하인 문자열, 알파벳 중복 없음
 * course: 추가하고 싶은 코스요리의 단품 메뉴 구성이 담긴 1 이상 10이하 배열
 * course 각 요소는 2 이상 10 이하 자연수가 "오름차순"으로 정렬돼 있고, 중복 없음
 * 반환값: 알파벳 "오름차순"으로 정렬. 메뉴 "구성 여러개면 모두 배열에 담아서 반환"
 */

function solution(orders, course) {
  // 모든 조합에 대한 주문 빈도 생성 e.g. Map { 'AB': 1, 'AC': 4, 'ABC': 1, ... }
  const freqMap = orders.reduce((map, order) => {
    const sortedOrder = order.split('').sort();
    course.forEach(size => {
      const combs = getCombinationsIterative(sortedOrder, size);
      combs.forEach(comb => {
        const combStr = comb.join('');
        map.set(combStr, (map.get(combStr) ?? 0) + 1);
      });
    });
    return map;
  }, new Map());

  const result = [];
  // 가장 많은 주문 조합을 저장할 배열 초기화 e.g. [0, 0, 0, 0, 0]
  // 각 요소는 코스의 길이를 나타냄. 예를들어 인덱스 3은 'ABC'와 같은 길이 3인 코스를 의미
  // maxCount['ABC'.length] 이렇게 문자열 길이를 인덱스로 사용하기 때문에
  // maxCount 배열 크기는 코스의 최대 크기 + 1로 설정
  const maxCount = Array(course.at(-1) + 1).fill(0);

  // 각 코스의 최대 빈도 결정 e.g. [0, 0, 4, 3, 2]
  // 길이 2인 코스의 최대 빈도는 4, 길이 3인 코스의 최대 빈도는 3, ...
  freqMap.forEach((count, { length: menuLen }) => {
    if (count > 1 && count > maxCount[menuLen]) maxCount[menuLen] = count;
  });

  // 최대 빈도에 해당하는 코스를 result 배열에 추가
  freqMap.forEach((count, comb) => {
    if (count === maxCount[comb.length]) result.push(comb);
  });

  return result.sort();
}

const cases = [
  generateTestPair(
    [
      ['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'],
      [2, 3, 4],
    ],
    ['AC', 'ACDE', 'BCFG', 'CDE'],
  ),
  generateTestPair(
    [
      ['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'],
      [2, 3, 5],
    ],
    ['ACD', 'AD', 'ADE', 'CD', 'XYZ'],
  ),
  generateTestPair(
    [
      ['XYZ', 'XWY', 'WXA'],
      [2, 3, 4],
    ],
    ['WX', 'XY'],
  ),
];

console.log(solution(...cases[0].input));
