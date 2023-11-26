/**
 * [요구사항]
 * 같은 모양의 블록이 2x2 형태로 4개가 붙어있으면 사라지면서 점수를 얻는 게임
 * 블록이 지워진 후엔 위에 있는 블록이 아래로 떨어져 빈 공간을 채움
 * 빈 공간을 채운 후 다시 2x2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지는 과정 반복
 * 블록이 주어졌을 때 지워지는 블록은 모두 몇 개인지 반환하는 함수 작성
 */

import { generateTestPair } from '../../utils.js';

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
 * --FA--
 * ---F--
 * T--RAA
 * TTMMMF
 * TMMTTJ
 *
 * [내려간 후]
 * ---A--
 * ---A--
 * T-TFNT
 * TTFRAA
 * TTMMMF
 * TMMTTJ
 *
 * [4개 지워진 후]
 * ---A--
 * ---A--
 * T-TFNT
 * --FRAA
 * --MMMF
 * TMMTTJ
 *
 * [내려간 후]
 * ---A--
 * ---A--
 * --TFNT
 * --FRAA
 * T-MMMF
 * TMMTTJ
 *
 * 정답 15개
 */

const DX = [0, 1, 1];
const DY = [1, 0, 1];

const checkSameBlock = (x, y, target, board) => {
  const saved = [target];

  for (let i = 0; i < DX.length; i += 1) {
    const nx = DX[i] + x;
    const ny = DY[i] + y;
    if (nx < board.length && ny < board[i].length) {
      const nt = board[nx][ny];
      if (target === nt) saved.push(nt);
    }
  }

  return saved.length === 4;
};

const removeSameBlock = (clearMap, board) => {
  for (let i = 0; i < clearMap.length; i++) {
    const [x, y] = clearMap[i];
    board[x][y] = null;

    for (let j = 0; j < DX.length; j++) {
      const nx = x + DX[j];
      const ny = y + DY[j];
      board[nx][ny] = null;
    }
  }
};

const cleanBlock = board => {
  const swap = (x, y) => {
    for (let i = x - 1; i >= 0; i--) {
      const target = board[i][y];
      if (target) {
        board[x][y] = target;
        board[i][y] = null;
        break;
      }
    }
  };

  for (let i = board.length - 1; i >= 0; i--) {
    const hasNull = board[i].some(n => n === null);
    if (hasNull) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) swap(i, j);
      }
    }
  }
};

function solution(m, n, board) {
  const gameBoard = Array.from({ length: m }, (_, i) => board[i].split(''));

  const processBoard = () => {
    const clearMap = [];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const target = gameBoard[i][j];
        if (target) {
          const shouldRemove = checkSameBlock(i, j, target, gameBoard);
          if (shouldRemove) clearMap.push([i, j]);
        }
      }
    }

    if (!clearMap.length) return;

    removeSameBlock(clearMap, gameBoard);
    cleanBlock(gameBoard);
    processBoard();
  };

  processBoard();

  return gameBoard.reduce((acc, cur) => {
    return acc + cur.filter(e => e === null).length;
  }, 0);
}

/**
 * [시뮬레이션]
 * m=4, n=5, board=['CCBDE', 'AAADE', 'AAABF', 'CCBBF'], output=14
 *
 * CCBDE
 * AAADE
 * AAABF
 * CCBBF
 *
 * [6개 지워진 후]
 * CCBDE
 * ---DE
 * ---BF
 * CCBBF
 *
 * [내려온 후]
 * ---DE
 * ---DE
 * CCBBF
 * CCBBF
 *
 * [8개 지워진 후]
 * ---DE
 * ---DE
 * ----F
 * ----F
 *
 * [내려온 후]
 * ----E
 * ----E
 * ---DF
 * ---DF
 */

const cases = [
  generateTestPair([4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']], 14), // m, n, board, output
  generateTestPair(
    [6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']],
    15,
  ),
];

console.log(solution(...cases[0].input));
