import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 정수 n, left, right 가 주어질 때 아래 과정을 거쳐 1차원 배열로 만드려고 함
 * 1. n행 n열 크기의 비어있는 2차원 배열을 만든다
 * 2. 1행 1열부터 i행 i 열까지의 영역 내 모든 빈칸을 숫자 i로 채운다
 * 3. 1행, 2행, ..., n 행을 잘라서 모두 이어붙인 새로운 1차원 배열을 만든다
 * 새로운 1차원 배열을 arr 이라고 할 때 arr[left], arr[left+1], ..., arr[right]만 남기고 나머지는 지운다
 *
 * [제한사항]
 * 1 <= n <= 10⁷
 * 0 <= left <= right < n²
 * right - left < 10⁵
 *
 * [풀이]
 * 3*3 행렬의 각 위치를 좌표로 나타내면...
 * (0,0)(1,0)(2,0)
 * (0,1)(1,1)(2,1)
 * (0,2)(1,2)(2,2)
 * 각 위치의 row, col 중 큰 수 + 1은 해당 위치의 값
 * 따라서 i = Math.max(row, col) + 1
 * */

function solution(n, left, right) {
  const result = [];

  for (let i = left; i <= right; i++) {
    const row = Math.floor(i / n);
    const col = i % n;
    result.push(Math.max(row, col) + 1);
  }

  return result;
}

const cases = [
  // input: [n, left, right]
  generateTestPair([3, 2, 5], [3, 2, 2, 3]),
  generateTestPair([4, 7, 14], [4, 3, 3, 3, 4, 4, 4, 4]),
];

cases.forEach(({ input, output }, caseIdx) => {
  const result = solution(...input);
  const passed = result.every((r, i) => output[i] === r);
  console.log(`${caseIdx + 1}번 테스트 ${passed ? '통과' : '실패'}`);
});
