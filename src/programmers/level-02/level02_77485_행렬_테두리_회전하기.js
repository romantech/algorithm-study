import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * rows * columns 크기의 행렬에 1부터 rows * columns까지의 숫자가 한 줄씩 적혀있음
 * 이 행렬에서 직사각형 모양의 범위를 여러 번 선택해, 테두리에 있는 숫자들을 시계 방향으로 회전시키려함
 * 각 회전은 x1, y1, x2, y2인 정수 4개로 표현
 * x1 행 y1 열부터 x2 행 y2 열까지 영역에 해당하는 직사각형에서 테두리에 있는 숫자들을 한 칸씩 시계방향으로 회전
 * 행렬의 세로 길이(행 개수) rows, 가로 길이(열 개수) columns, 회전들의 목록 queries가 주어질 때
 * 각 회전들을 배열에 적용한 뒤, 그 회전에 의해 위치가 바뀐 숫자들 중 가장 작은 숫자들을 순서대로 배열에 담아서 리턴
 *
 * [제한사항]
 * rows: 2 이상 100 이하 자연수
 * columns: 2 이상 100 이하 자연수
 * queries: 1 이상 10000 이하. 각 행은 4개의 정수 [x1, y1, x2, y2]
 * 모든 회전은 순서대로 이루어짐. 예를 들어 두 번째 회전에 대한 답은 첫번째 회전을 실행한 다음
 * 그 상태에서 두 번째 회전을 실행했을 때 이동한 숫자 중 최솟값을 계산하면 됨
 */

function solution(rows, columns, queries) {
  const result = [];

  const board = Array.from({ length: rows }, (_row, i) =>
    Array.from({ length: columns }, (_col, j) => i * columns + j + 1),
  );

  const directions = [
    [0, 1], // 오른쪽
    [1, 0], // 아래
    [0, -1], // 왼쪽
    [-1, 0], // 위
  ];

  const getDelta = (query, dirIndex) => {
    switch (dirIndex) {
      case 0:
        return query[3] - query[1];
      case 1:
        return query[2] - query[0];
      case 2:
        return query[3] - query[1];
      case 3:
        return query[2] - query[0];
      default:
        return 0;
    }
  };

  for (const query of queries) {
    const [x1, y1, x2, y2] = query.map(coord => coord - 1);
    let prevValue = board[x1][y1];
    let minValue = prevValue;

    let curX = x1;
    let curY = y1;

    for (let dirIndex = 0; dirIndex < 4; dirIndex++) {
      const [dx, dy] = directions[dirIndex];
      const moveCount = getDelta([x1, y1, x2, y2], dirIndex);

      for (let move = 0; move < moveCount; move++) {
        curX += dx;
        curY += dy;
        const temp = board[curX][curY];
        board[curX][curY] = prevValue;
        prevValue = temp;
        minValue = Math.min(minValue, temp);
      }
    }

    result.push(minValue);
  }

  return result;
}

const cases = [
  generateTestPair(
    [
      6,
      6,
      [
        [2, 2, 5, 4],
        [3, 3, 6, 6],
        [5, 1, 6, 3],
      ],
    ],
    [8, 10, 25],
  ),
  generateTestPair(
    [
      3,
      3,
      [
        [1, 1, 2, 2],
        [1, 2, 2, 3],
        [2, 1, 3, 2],
        [2, 2, 3, 3],
      ],
    ],
    [1, 1, 5, 3],
  ),
  generateTestPair([100, 97, [[1, 1, 100, 97]]], [1]),
];

console.log(solution(...cases[2].input));
