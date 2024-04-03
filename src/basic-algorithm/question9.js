/**
 * 프로그래머스 - 입문 - 120866 - 안전지대
 * 2차원 그리드에서 각 셀이 1이 아니고, 그 주변 8개 셀도 모두 1이 아닌 셀의 총 개수 계산
 */

import { generateTestPair } from '../utils.js';

function solution(board) {
  const directions = [
    [-1, -1], // Left Up
    [-1, 0], // Up
    [-1, 1], // Right Up
    [0, -1], // Left
    [0, 1], // Right
    [1, -1], // Left Down
    [1, 0], // Down
    [1, 1], // Right Down
  ];

  return board.reduce((result, curRow, rowIdx) => {
    const validCellsInRow = curRow.filter((cell, colIdx) => {
      if (cell === 1) return false;

      return directions.every(([deltaRow, deltaCol]) => {
        const neighborCell = board[deltaRow + rowIdx]?.[deltaCol + colIdx];
        if (!neighborCell) return true;
        return neighborCell === 0;
      });
    }).length;

    return result + validCellsInRow;
  }, 0);
}

const cases = [
  generateTestPair(
    [
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    ],
    16,
  ),
  generateTestPair(
    [
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
    ],
    13,
  ),
  generateTestPair(
    [
      [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
      ],
    ],
    0,
  ),
];

cases.forEach(({ input, output }, i) => {
  const result = solution(...input) === output;
  console.log(`${i + 1}번 테스트: ${result ? '통과' : '실패'}`);
});
