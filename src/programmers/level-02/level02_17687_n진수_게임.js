import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 1. 숫자를 0부터 시작해서 차례대로 말한다 (첫번째 사람 0, 두번째 사람 1, ..., 열번째 사람 9)
 * 2. 10 이상의 숫자는 한 자리씩 끊어서 말한다 (열한번째 사람은 10의 첫자리 1, 열두번째 사람은 두번째 자리인 0)
 * 10진수로 말할 때: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1(10), 0(10), 1(11), 1(11), 1(12), 2(12), ...
 * 2진수로 말할 때: 0, 1, 1(10), 0(10), 1(11), 1(11), 1(100), 0(100), ...
 * 자신이 말해야 하는 숫자 목록 반환
 *
 * [파라미터]
 * n: 진법. 2 <= n <= 16
 * t: 미리 구할 숫자의 개수. 0 < t <= 1000
 * m: 게임 참가 인원. 2 <= m <= 100
 * p: 순서. 1 <= p <= m
 *
 * [출력]
 * 말해야 하는 숫자 t개를 공백 없이 차례대로 나타낸 문자열
 * 10~15는 대문자 A~F로 출력
 *
 * [예시]
 * n = 2, t = 4, m = 2, p = 1
 * 0, 1, 1(10=2), 0(10=2), 1(11=3), 1(11=3), 1(100=4), 0(100=4), 0(100=4)
 * -> result = [0, 1, 1, 0, 1, 1, 1, 0, 0, ...]
 * -> idx = (p - 1) = 0, prev + m = 2, prev + m = 4, prev + m = 6
 * -> 0111
 *
 * n = 16, t = 16, m = 2, p = 1
 * 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A(10), B(11), C(12), D(13), E(14), F(15), 1(10=16), 0(10=16), 1(11=17), ...
 * -> idx = (p - 1) = 0, prev + m = 2, prev + 4 = 4, ...
 * -> 02468ACE11111111
 */

function solution(n, t, m, p) {
  const numList = [];
  const result = [];
  const digits = [];

  let num = 0;
  let idx = p - 1;

  while (result.length < t) {
    if (digits.length === 0) {
      digits.push(...num.toString(n).toUpperCase());
      num++;
    }

    numList.push(digits.shift());

    if (idx <= numList.length - 1) {
      result.push(numList[idx]);
      idx += m;
    }
  }

  return result.join('');
}

const cases = [
  generateTestPair([2, 4, 2, 1], '0111'),
  generateTestPair([16, 16, 2, 1], '02468ACE11111111'),
  generateTestPair([16, 16, 2, 2], '13579BDF01234567'),
];

console.log(solution(...cases[1].input));
