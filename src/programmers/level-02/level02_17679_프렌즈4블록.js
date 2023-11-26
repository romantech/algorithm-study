/**
 * [요구사항]
 * 같은 모양의 블록이 2x2 형태로 4개가 붙어있으면 사라지면서 점수를 얻는 게임
 * 블록이 지워진 후엔 위에 있는 블록이 아래로 떨어져 빈 공간을 채움
 * 빈 공간을 채운 후 다시 2x2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지는 과정 반복
 * 블록이 주어졌을 때 지워지는 블록은 모두 몇 개인지 반환하는 함수 작성
 */

import { generateTestPair } from '../../utils';

/**
 * [파라미터]
 * m : 보드 높이, 30이하
 * n : 보드 너비, 2이상
 * board : 길이 n인 문자열 요소 m개를 갖는 배열
 */

/**
 * [예시]
 * TTTANT
 * RRFACC
 * RRRFCC
 * TRRRAA
 * TTMMMF
 * TMMTTJ
 *
 * [11개 지워진 후]
 * TTTANT
 *   FA
 *    F
 * T  RAA
 * TTMMMF
 * TMMTTJ
 *
 * [내려간 후]
 *    A
 *    A
 * T TFNT
 * TTFRAA
 * TTMMMF
 * TMMTTJ
 *
 * [4개 지워진 후]
 *    A
 *    A
 * T TFNT
 *   FRAA
 *   MMMF
 * TMMTTJ
 *
 * [내려간 후]
 *    A
 *    A
 *   TFNT
 *   FRAA
 * T MMMF
 * TMMTTJ
 *
 * 정답 15개
 */

function solution(m, n, board) {
  const answer = 0;
  return answer;
}

/**
 * [시뮬레이션]
 * m=4, n=5, board=['CCBDE', 'AAADE', 'AAABF', 'CCBBF'], output=14
 * [6개 지워진 후]
 * CCBDE
 *    DE
 *    BF
 * CCBBF
 *
 * [내려온 후]
 *    DE
 *    DE
 * CCBBF
 * CCBBF
 *
 * [8개 지워진 후]
 *    DE
 *    DE
 *     F
 *     F
 *
 * [내려온 후]
 *     E
 *     E
 *    DF
 *    DF
 */

const cases = [
  generateTestPair([4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']], 14), // m, n, board, output
  generateTestPair(
    [6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']],
    15,
  ),
];

console.log(...cases[0].input);
