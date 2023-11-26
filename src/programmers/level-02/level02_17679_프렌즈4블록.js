import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 같은 모양의 블록이 2x2 형태로 4개가 붙어있으면 사라지면서 점수를 얻는 게임
 * 블록이 지워진 후엔 위에 있는 블록이 아래로 떨어져 빈 공간을 채움
 * 빈 공간을 채운 후 다시 2x2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지는 과정 반복
 * 블록이 주어졌을 때 지워지는 블록은 모두 몇 개인지 반환하는 함수 작성
 */

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
  for (let i = 0; i < DX.length; i += 1) {
    const nx = DX[i] + x;
    const ny = DY[i] + y;

    // 범위 벗어나면 undefined 이므로 조건 통과 안함
    if (board[nx]?.[ny] !== target) return false;
  }

  return true;
};

const removeSameBlock = (toRemove, board) => {
  toRemove.forEach(([row, col]) => {
    board[row][col] = null;

    for (let i = 0; i < DX.length; i += 1) {
      const nx = row + DX[i];
      const ny = col + DY[i];
      board[nx][ny] = null;
    }
  });
};

const dropBlocks = board => {
  const swap = (row, col) => {
    for (let newRow = row - 1; newRow >= 0; newRow--) {
      const target = board[newRow][col];
      if (target) {
        board[row][col] = target;
        board[newRow][col] = null;
        break;
      }
    }
  };

  for (let row = board.length - 1; row >= 0; row--) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) swap(row, col);
    }
  }
};

function solution(m, n, board) {
  const gameBoard = board.map(row => row.split(''));

  const processBoard = () => {
    const toRemove = [];

    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        const block = gameBoard[row][col];
        const hasSameBlock = checkSameBlock(row, col, block, gameBoard);
        if (block && hasSameBlock) toRemove.push([row, col]);
      }
    }

    if (!toRemove.length) return;

    removeSameBlock(toRemove, gameBoard);
    dropBlocks(gameBoard);
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
