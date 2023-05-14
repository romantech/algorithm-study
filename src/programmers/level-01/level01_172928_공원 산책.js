/* eslint-disable no-unused-expressions */
/**
 * 공원을 나타내는 문자열 배열 park, 수행할 명령이 담긴 routes를 받아 모든 명령 수행 후 놓인 위치 [y, x] 반환
 * 명령 수행 결과가 공원을 벗어나거나 장애물을 만나면 건너뛰고 다음 명령 수행
 * park 요소 중 S는 시작점, X는 장애물
 * 예제 1
 * park : ["OSO","OOO","OXO","OOO"] | routes : ["E 2","S 3","W 1"]
 * E 2 -> 동쪽으로 2칸 -> 공원을 벗어나므로 건너뜀
 * S 3 -> 남쪽으로 3칸 -> "O(X)O" -> 장애물을 만났으므로 건너뜀
 * W 1 -> 서쪽으로 1칸 -> [0, 0]
 */

export const cases = [
  {
    park: ['SOO', 'OOO', 'OOO'],
    routes: ['E 2', 'S 2', 'W 1'],
    output: [2, 1],
  },
  {
    park: ['SOO', 'OXX', 'OOO'],
    routes: ['E 2', 'S 2', 'W 1'],
    output: [0, 1],
  },
  {
    park: ['OSO', 'OOO', 'OXO', 'OOO'],
    routes: ['E 2', 'S 3', 'W 1'],
    output: [0, 0],
  },
  {
    park: ['SOXO', 'OOOO', 'OOOO'],
    routes: ['E 1', 'S 1', 'E 2'],
    output: [1, 3],
  },
];

// 시작점(S)를 찾는다. [y, x]
// 명령어가 공원을 넘어 갔는지 확인한다
// 명령어가 장애물을 만났는지 확인한다
// E(+) | W(-) = x 이동,
// S(+) | N(-) = y 이동

export function solution(park, routes) {
  const current = { x: 0, y: 0 };

  park.some((block, y) => {
    const x = block.indexOf('S');
    if (x !== -1) {
      current.x = x;
      current.y = y;
      return true;
    }
    return false;
  });

  const validator = (target, axis, toAxis, isIncrease) => {
    if (toAxis < 0 || toAxis > target.length - 1) return false;
    let i = current[axis];
    while (isIncrease ? i <= toAxis : i >= toAxis) {
      const value = axis === 'x' ? target[i] : target[i][current.x];
      if (value === 'X') return false;
      isIncrease ? i++ : i--;
    }

    return true;
  };

  const dirMatcher = (curDir, target) => target.some(dir => dir === curDir);

  routes.forEach(route => {
    const [dir, count] = route.split(' ');
    const isIncrease = dirMatcher(dir, ['E', 'S']);
    const axis = dirMatcher(dir, ['E', 'W']) ? 'x' : 'y';
    const toAxis = current[axis] + (isIncrease ? +count : -+count);
    const target = axis === 'x' ? park[current.y] : park;
    if (validator(target, axis, toAxis, isIncrease)) current[axis] = toAxis;
  });

  return [current.y, current.x];
}

solution(cases[0].park, cases[0].routes);

// 레퍼런스 (GPT가 리팩토링)
export function solution2(park, routes) {
  const directions = {
    E: [0, 1], // 동
    W: [0, -1], // 서
    S: [1, 0], // 남
    N: [-1, 0], // 북
  };
  let [x, y] = [0, 0];
  for (const [i, row] of park.entries()) {
    // Object.entries(park) -> [['0', 'S00'], ['1', '000'], ...]
    const yIdx = row.indexOf('S');
    if (yIdx !== -1) {
      [x, y] = [i, yIdx];
      break;
    }
  }

  for (const route of routes) {
    const [direction, distance] = route.split(' ');
    let [nx, ny] = [x, y];
    let cnt = 0;
    while (cnt < +distance) {
      [nx, ny] = [nx + directions[direction][0], ny + directions[direction][1]];
      if (!park[nx]?.[ny] || park[nx][ny] === 'X') break;
      cnt++;
    }
    if (cnt === +distance) [x, y] = [nx, ny];
  }

  return [x, y];
}

solution2(cases[0].park, cases[0].routes);
