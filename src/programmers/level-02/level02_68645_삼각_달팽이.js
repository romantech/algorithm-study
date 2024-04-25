import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 삼각형의 밑변 길이와 높이를 나타내는 n이 주어지면
 * 배열을 반 시계 방향으로 돌면서 숫자를 채워넣는 달팽이 채우기 문제
 *
 * [핵심 포인트]
 * 마지막 오른쪽 바깥쪽을 채운 후 다음 사이클의 좌표는 y + 1
 * 예를들어 n = 7에서 가장 바깥쪽의 오른쪽 삼각형 마지막은 (1, 1) 다음 사이클 시작점은 (1, 2)
 */

const createTriangleArray = n => {
  // 더욱 간결하게 배열 생성
  const triangleArray = Array.from({ length: n }, (_, i) => Array(i + 1));
  /**
   * 1 + 2 + 3 + 4 ... 수의 총 합이므로 등차수열로 계산 가능
   * 참고 노트: https://colorfilter.notion.site/TIL-545e8bf0172b496d8143a3c7e056a17b
   */
  const sum = (n * (n + 1)) / 2;
  return { triangleArray, sum };
};

const OFFSETS = [
  [0, 1], // 왼쪽
  [1, 0], // 아래
  [-1, -1], // 오른쪽
];

const nextPos = ([x, y], dir) => {
  const [dx, dy] = OFFSETS[dir % 3];
  return [x + dx, y + dy];
};

export function solution(n) {
  const { triangleArray, sum } = createTriangleArray(n);
  let pos = [0, 0];
  let num = 0;
  let dir = 0; // 0 왼쪽 1 아래 2 오른쪽

  while (num < sum) {
    const [x, y] = pos;
    triangleArray[y][x] = ++num;

    let [nx, ny] = nextPos(pos, dir);

    if (
      ny >= triangleArray.length ||
      nx >= triangleArray[ny].length ||
      triangleArray[ny][nx] !== undefined
    ) {
      dir = (dir + 1) % 3;
      [nx, ny] = nextPos(pos, dir);
    }

    pos = [nx, ny];
  }

  return triangleArray.flat();
}

export function reference(n) {
  const a = Array.from({ length: n }, (_, i) => Array(i + 1));

  let row = -1;
  let col = 0;
  let fill = 0;

  for (let i = n; i > 0; i -= 3) {
    a[++row][col] = ++fill;
    for (let j = 0; j < i - 1; j++) a[++row][col] = ++fill;
    for (let j = 0; j < i - 1; j++) a[row][++col] = ++fill;
    for (let j = 0; j < i - 2; j++) a[--row][--col] = ++fill;
  }

  return a.flat();
}

export const cases = [
  generateTestPair([4], [1, 2, 9, 3, 10, 8, 4, 5, 6, 7]),
  generateTestPair([5], [1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]),
  generateTestPair(
    [6],
    [1, 2, 15, 3, 16, 14, 4, 17, 21, 13, 5, 18, 19, 20, 12, 6, 7, 8, 9, 10, 11],
  ),
];
