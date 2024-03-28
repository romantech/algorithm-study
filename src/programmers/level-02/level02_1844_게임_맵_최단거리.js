// 2차원 배열에서 행/열 1/1부터 마지막 행/열에 까지의 최단 거리 찾기
// 맵은 0과 1로 이루어져 있고, 0은 이동할 수 없는 벽
// 마지막 행/열에 도달할 수 없으면 -1 리턴

const DIRECTIONS = [
  [-1, 0], // top
  [1, 0], // bottom
  [0, -1], // left
  [0, 1], // right
];

function solution(maps) {
  const rows = maps.length;
  const cols = maps[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const queue = [[0, 0, 1]]; // [[x, y, distance]]
  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift();
    if (x === rows - 1 && y === cols - 1) return distance;

    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && !visited[nx][ny] && maps[nx][ny] !== 0) {
        visited[nx][ny] = true;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  return -1;
}

const testCase = [
  {
    input: [
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1],
    ],
    output: 11,
  },
  {
    input: [
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1],
    ],
    output: -1,
  },
];

console.log(solution(testCase[0].input));
