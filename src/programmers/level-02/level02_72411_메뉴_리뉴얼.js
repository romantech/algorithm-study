import { generateTestPair } from '../../utils.js';

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
 * course 각 요소는 2 이상 10 이하 자연수가 오름차순으로 정렬돼 있고, 중복 없음
 * 반환값: 알파벳 오름차순으로 정렬. 메뉴 구성 여러개면 모두 배열에 담아서 반환
 */

function solution(orders, course) {
  const answer = [];
  return answer;
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
