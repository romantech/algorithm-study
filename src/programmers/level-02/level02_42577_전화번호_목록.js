/* eslint-disable camelcase */
import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 전화번호부에 적힌 전화번호를 담은 배열 phone_book이 매개변수로 주어질 때
 * 어떤 번호가 다른 번호의 접두어인 경우가 있으면 false 없으면 true 반환
 * 예를들어 전호번호가 아래와 같을 때 "구조대" 전화번호는 "지영석" 전화번호의 접두사
 * - 구조대 : 119
 * - 박준영 : 97 674 223
 * - 지영석 : 11 9552 4421
 *
 * [매개변수]
 * phone_book : 길이 1 이상 1000000이하
 * 각 전화번호의 길이는 1 이상 20이하
 * 중복된 전화번호
 *
 * [예시]
 * phone_book : ["123","456","789"] -> 한 번호가 다른 번호의 접두사인 경우가 없으므로 true
 * phone_book : ["12","123","1235","567","88"] -> 첫 번째 전화번호 "12"가 두 번째 전화번호 "123"의 접두사이므로 false
 */

function solution(phone_book) {
  phone_book.sort(); // 사전순으로 정렬 (알파벳, 숫자 등의 순서로 정렬)

  const hasPrefix = phone_book.some((n, i) => {
    // 전화번호를 사전순으로 정렬하면 접두어 관계에 있는 문자열들이 서로 가까운 위치에 놓이게 됨
    // 예를들어 A 번호(12)가 B 번호(123)의 접두어인 경우, 정렬후엔 A, B 순서로 위치하게 됨
    // ["9", "97", "123", "1234", "12"] -> ["12", "123", "1234", "9", "97"]
    // 이런 원리로 전체 목록을 순회할 필요 없이 인접한 숫자만 검사해서 접두어 관계를 효율적으로 파악 가능
    if (i === phone_book.length - 1) return false;
    return phone_book[i + 1].startsWith(n);
  });

  return !hasPrefix;
}

const cases = [
  generateTestPair([['119', '97674223', '1195524421']], false),
  generateTestPair([['123', '456', '789']], true),
  generateTestPair([['12', '123', '1235', '567', '88']], false),
];

console.log(solution(...cases[2].input));
