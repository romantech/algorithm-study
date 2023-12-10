import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 조이스틱으로 알파벳 이름 완성, 처음엔 A로만 이루어져 있음
 * 완성해야 하는 이름이 세글자면 AAA, 네 글자면 AAAA
 * name이 매개변수로 주어질 때 조이스틱 조작 횟수의 최솟값 반환
 * ▲ : 다음 알파벳
 * ▼ : 이전 알파벳 (A에서 아래쪽으로 이동하면 Z)
 * ◀ : 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
 * ▶ : 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)
 *
 * "JAZ"는 아래 방법으로 11번 이동시켜서 만들 수 있음
 * ▲ * 9 : J 완성 (ABCDEFGHIJKLMNOPQRSTUVWXYZ)
 * ◀ * 1 : 마지막 문자 위치로 이동
 * ▼ * 1 : Z 완성
 *
 * [매개변수]
 * name: 만들고자 하는 이름, 대문자, 1 이상 20 이하
 *
 * [코드 포인트]
 * 알파벳 UTF-16 코드포인트 (str.charCodeAt() 반환값)
 * 'A' 코드포인트 65, 'Z' 코드포인트 90
 *
 * [참고 링크]
 * @see https://leeeehhjj.tistory.com/83
 * @see https://velog.io/@jqdjhy/프로그래머스-파이썬-조이스틱-Greedy
 */

function getJoystickMove(char) {
  // char === 'B'라면 moveUp = 66 - 65 = 1, moveDown = 90 - 66 + 1 = 25
  // char에 도달하기 위해 A부터 오른쪽으로 이동한 거리
  const moveUp = char.charCodeAt() - 'A'.charCodeAt();
  // char에 도달하기 위해 A부터 왼쪽으로 이동(순환)한 거리. Z가 아닌 A부터 왼쪽으로 이동하므로 + 1
  const moveDown = 'Z'.charCodeAt() - char.charCodeAt() + 1;
  return Math.min(moveUp, moveDown);
}

// 다른 사람 풀이 참고해서 작성
function solution(name) {
  let answer = 0;

  // 문자열 처음~마지막까지 순서대로 이동할 때 필요한 최대 거리
  let minMove = name.length - 1;

  for (let i = 0; i < name.length; i++) {
    // 상하이동
    // 각 문자까지 이동하는데 필요한 최소 조이스틱 이동 수
    answer += getJoystickMove(name[i]);

    // 좌우이동
    // 'A'가 아닌 문자까지의 인덱스 (A의 가중치는 항상 0이어서 방문할 필요 없으므로)
    let nextIndex = i + 1;
    while (nextIndex < name.length && name[nextIndex] === 'A') {
      nextIndex++;
    }

    // 오른쪽으로 이동 후 다시 왼쪽으로 이동하는 경우 : 시작점(0) -> 현재 인덱스 -> (turn) 시작점 -> nextIndex
    // --> ①
    // <-- ②     <-- ③
    // ------name------
    // i * 2 : 시작점(0) ~ 현재 위치(i) 까지의 왕복 거리
    // name.length - nextIndex : 문자열 끝에서 nextIndex 까지의 거리
    minMove = Math.min(minMove, i * 2 + name.length - nextIndex);

    // 왼쪽으로 이동 후 다시 오른쪽으로 이동하는 경우 : 문자열 마지막(이동 거리 1) -> nextIndex -> (turn) 문자열 마지막 -> 현재 인덱스
    //            <-- ①
    // --> ③     --> ②
    // ------name------
    // (name.length - nextIndex) * 2 : 문자열 끝에서 nextIndex 까지의 왕복 거리
    // i : 시작점(0) ~ 현재 위치(i)까지의 거리
    minMove = Math.min(minMove, (name.length - nextIndex) * 2 + i);
  }

  return answer + minMove;
}

const cases = [
  generateTestPair(['JEROEN'], 56),
  generateTestPair(['JAN'], 23),
  generateTestPair(['ABAAB'], 5),
  generateTestPair(['AAAAABBAAAAAAABAAA'], 16),
  generateTestPair(['AABAAAAAAABBB'], 11),
  generateTestPair(['CANAAAAANAN'], 48),
];

cases.forEach(({ input, output }) => {
  console.log(solution(...input) === output);
});

/**
 * [시뮬레이션]
 * rm: 오른쪽으로 이동, lm: 왼쪽으로 이동, c: 알파벳 획득
 *
 * 문자열 : JEROEN
 * 9(c) + 1(rm) + 4(c) + 1(rm) + 9(c) + 1(rm) + 12(c) + 1(rm) + 4(c) + 1(rm) + 13(c) = 56
 *
 * 문자열 : JAN
 * 9(c) + 1(lm) + 13(c) = 23
 *
 * 문자열 : ABAAB
 * 1(rm) + 1(c) + 2(lm) + 1(c) = 5
 *
 * 문자열 : AAAAABBAAAAAAABAAA
 * 4(lm) + 1(c) + 8(lm) + 1(c) + 1(lm) + 1(c) = 16
 *
 * 문자열 : AABAAAAAAABBB
 * 2(rm) + 1(c) + 3(lm) + 1(c) + 1(lm) + 1(c) + 1(lm) + 1(c)
 * 주의! 처음 시작시 오른쪽으로 이동하는게 더 거리 짧음
 */
