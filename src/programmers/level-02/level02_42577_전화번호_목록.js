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
  const answer = true;
  return answer;
}

const cases = [
  generateTestPair([['119', '97674223', '1195524421']], false),
  generateTestPair([['123', '456', '789']], true),
  generateTestPair([['12', '123', '1235', '567', '88']], false),
];
