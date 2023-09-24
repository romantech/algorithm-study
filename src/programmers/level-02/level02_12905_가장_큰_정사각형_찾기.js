/*
1과 0으로 이뤄진 board에서 1로 이루어진 가장 큰 정사각형의 넓이 반환
예제 1: 아래 4x4 보드에서 [0, 2] ~ [3, 3] 범위가 모두 1로 이루어져 가장 크므로 3 * 3 = 9 반환
[0, 1, 1, 1]
[1, 1, 1, 1]
[1, 1, 1, 1]
[0, 0, 1, 0]

예제 2: [0, 2] ~ [1, 3] 범위가 모두 1로 이루어져 가장 크므로 2 * 2 = 4 반환
[0,0,1,1]
[1,1,1,1]

board [1, 1] 부터 상/하/좌상 위치의 최소값 + 1 값이 현재 위치에서 만들 수 있는 정사각형 한 변의 최대 길이
이 최소값 + 1 값을 현재 위치에 할당해서 다음 순회 시 재사용
더 자세한 내용은 타 블로그 해설 참고 https://onlydev.tistory.com/65
*/

const DIRECTIONS = [
  [-1, 0], // top [x, y]
  [-1, -1], // top left [x, y]
  [0, -1], // left [x, y]
];

const getMin = (board, i, j) => {
  return DIRECTIONS.reduce((acc, [dx, dy]) => {
    return Math.min(acc, board[i + dx][j + dy]);
  }, Infinity);
};

function solution(board) {
  const row = board.length;
  const col = board[0].length;

  let max = 0;

  // 1 * 1 크기의 board는 1 반환
  if (row === 1 || col === 1) return 1;

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (board[i][j] > 0) {
        const min = getMin(board, i, j);
        board[i][j] = min + 1;
        max = Math.max(max, board[i][j]);
      }
    }
  }

  return max * max;
}

const cases = [
  {
    input: [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
    ],
    output: 9,
  },
  {
    input: [
      [0, 0, 1, 1],
      [1, 1, 1, 1],
    ],
    output: 4,
  },
];

console.log(solution(cases[1].input));
