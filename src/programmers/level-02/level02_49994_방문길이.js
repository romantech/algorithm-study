import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 게임 캐릭터를 아래 4가지 명령어로 움직이려고 함
 * U: 위로 한 칸, D: 아래로 한 칸, R: 우측으로 한 칸, L: 좌측으로 한 칸
 * 캐릭터는 좌표 평면의 (0,0) 위치에서 시작
 * 좌표 평면의 경계는 왼쪽 위(-5,5), 왼쪽 아래(-5,-5), 오른쪽 위(5,5), 오른쪽 아래(5,-5)
 * 게임 캐릭터가 지나간 길 중 캐릭터가 처음 걸어본 길의 길이 반환
 * 좌표 평면의 경계를 넘어가는 명령어는 무시하고 다음 명령어대로 진행
 *
 * [파라미터]
 * dirs: 명령어 문자열 'U', 'D', 'R', 'L'만 주어짐
 * dirs 길이는 500 이하의 자연수
 */

export function solution(dirs) {
  const pos = [0, 0]; // x, y
  const directions = { U: [0, 1], D: [0, -1], R: [1, 0], L: [-1, 0] }; // [x, y]

  const isWithinRange = (dir) => dir <= 5 && dir >= -5;

  const generateKey = (from, to) => [from, to].sort().join('');

  return dirs.split('').reduce((history, dir) => {
    const [deltaX, deltaY] = directions[dir];
    const [cx, cy] = pos; // currentX, currentY

    const nx = deltaX + cx; // nextX
    const ny = deltaY + cy; // nextY

    if ([nx, ny].every(isWithinRange)) {
      [pos[0], pos[1]] = [nx, ny];

      /**
       * (0,0) -> (0,1) 이동 후 다시 (0,1) -> (0,0) 돌아오는 경우 이미 방문한 경로이므로 카운트에 포함하면 안됨.
       * 따라서 이동 전/후 좌표를 sort() 메서드로 정렬해서 양방향 경로가 고유한 값을 갖도록 취급
       * (0,0) -> (0,1) : 0001 (x: 0,0 비교후 작은게 앞으로, y: 0,1 비교후 작은게 앞으로)
       * (0,1) -> (0,0) : 0001 (위와 동일)
       */
      const key = generateKey(cx, nx) + generateKey(cy, ny); // 0001

      history.add(key);
    }

    return history;
  }, new Set()).size;
}

export const cases = [
  generateTestPair(['ULURRDLLU'], 7),
  generateTestPair(['LULLLLLLU'], 7),
  generateTestPair(['UDLRDURL'], 4, '경로에 왕복 이동이 포함된 경우'),
];
