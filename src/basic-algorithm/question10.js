import { generateTestPair } from '../utils.js';

/**
 * 문제 제목: 옹알이 (1) | 120956
 *
 * [요구사항]
 * 태어난지 6개월된 조카는 "aya", "ye", "woo", "ma" 네 가지 발음을
 * 최대한 1번씩 사용해 조합한(이어 붙인) 발음만 할 수 있음
 * 문자열 배열 babbling이 매개변수로 주어질 때 조카가 발음할 수 있는 단어의 개수 반환
 *
 * [제한사항]
 * babbling: 1 <= babbling.length <= 100
 * babbling의 각 요소 길이는 1 <= babbling[i] <= 15
 * babbling 각 문자열에서 "aya", "ye", "woo", "ma"는 각각 최대 1번만 등장
 * 모든 문자열은 소문자
 *
 * [예시]
 * 입력: ["ayaye", "uuuma", "ye", "yemawoo", "ayaa"]
 * 가능한 발음:
 * 1. ayaye = "aya" + "ye"
 * 2. ye
 * 3. yemawoo = "ye" + "ma" + "woo"
 */

function solution(babbling) {
  const answer = 0;
  return answer;
}

const cases = [
  generateTestPair([['aya', 'yee', 'u', 'maa', 'wyeoo']], 1),
  generateTestPair([['ayaye', 'uuuma', 'ye', 'yemawoo', 'ayaa']], 3),
];
