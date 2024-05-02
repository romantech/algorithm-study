import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 0, 1로 이루어진 2^n x 2^n 크기의 2차원 배열이 주어지고,
 * 이 배열을 쿼드 트리와 같은 방식으로 압축. 쿼드 트리는 1개 노드가 정확히 4개 자식을 가지는 구조
 * 압축할 때 내부에 있는 모든 수가 같은 값이면 하나로 압축 e.g. (0, 0, 0, 0) => (0)
 * 모든 수가 같지 않다면 정확히 4개의 균일한 정사각형 영역으로 쪼갠 뒤, 각 정사각형 영역에 같은 작업 반복
 * 그 후 배열에 최종적으로 남은 0, 1 개수를 각각 배열에 담아서 반환 -> 분할 정복 문제
 *
 * [제한사항]
 * arr 행의 개수는 1 이상, 1024 이하이며, 2의 거듭제곱수 형태 e.g. 1, 2, 4, 8, 1024
 * 각 행의 길이는 arr 행의 개수와 동일(정사각형)
 * 각 행의 모든 값은 0 혹은 1
 *
 * [예시 1]
 * [
 *  [1,1,0,0],
 *  [1,0,0,0],
 *  [1,0,0,1],
 *  [1,1,1,1],
 * ]
 * size 2 = [[1,1,1,0],0,[1,0,1,1],[0,1,1,1]]
 * -> return [4,9]
 *
 * [예시 2]
 * [
 *   [1,1,1,1,1,1,1,1],
 *   [0,1,1,1,1,1,1,1],
 *   [0,0,0,0,1,1,1,1],
 *   [0,1,0,0,1,1,1,1],
 *   [0,0,0,0,0,0,1,1],
 *   [0,0,0,0,0,0,0,1],
 *   [0,0,0,0,1,0,0,1],
 *   [0,0,0,0,1,1,1,1],
 * ]
 * [왼쪽 상단]
 * -> size 4 = [[1,1,1,1],[0,1,1,1],[0,0,0,0],[0,1,0,0]]
 * -> size 2 = [[1,1,0,1],1,[0,0,0,1],0]
 * -> return [5,5]
 * [오른쪽 상단]
 * ...생략
 */

/**
 * [시뮬레이션]
 * f(0, 0, 4)
 *    newSize = 2
 *    f(0, 0, 2)
 *        newSize = 1
 *        f(0, 0, 1) -> return 1
 *        f(0, 1, 1) -> return 1
 *        f(1, 0, 1) -> return 1
 *        f(1, 1, 1) -> return 0
 *        -> return [1, 1, 1, 0]
 *    f(0, 2, 2) -> return 0
 *    f(2, 0, 2) -> [1, 0, 1, 1]
 *    f(2, 2, 2) -> [0, 1, 1, 1]
 *    -> return [[1, 1, 1, 0], 0, [1, 0, 1, 1], [0, 1, 1, 1]]
 */

const compress = (arr, x, y, size, count) => {
  if (size === 1) {
    const num = arr[x][y];
    count[num]++;
    return num;
  }

  const newSize = size / 2;
  const results = [
    compress(arr, x, y, newSize, count),
    compress(arr, x, y + newSize, newSize, count),
    compress(arr, x + newSize, y, newSize, count),
    compress(arr, x + newSize, y + newSize, newSize, count),
  ];

  if (results.some(value => value !== results[0])) return results;

  count[results[0]] -= 3;
  return results[0];
};

function solution(arr) {
  const count = [0, 0];
  const compressed = compress(arr, 0, 0, arr.length, count);

  return count;
}

const cases = [
  generateTestPair(
    [
      [
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
      ],
    ],
    [4, 9],
  ),
  generateTestPair(
    [
      [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
      ],
    ],
    [10, 15],
  ),
  generateTestPair(
    [
      [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ],
    ],
    [10, 15],
  ),
];

console.log(solution(...cases[1].input));
