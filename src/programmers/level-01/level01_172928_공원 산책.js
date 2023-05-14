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

const cases = [
  {
    input: [
      ['SOO', 'OOO', 'OOO'], // park
      ['E 2', 'S 2', 'W 1'], // routes
    ],
    output: [2, 1],
  },
  {
    input: [
      ['SOO', 'OXX', 'OOO'], // park
      ['E 2', 'S 2', 'W 1'], // routes
    ],
    output: [0, 1],
  },
  {
    input: [
      ['OSO', 'OOO', 'OXO', 'OOO'], // park
      ['E 2', 'S 3', 'W 1'], // routes
    ],
    output: [0, 0],
  },
  {
    input: [
      ['SOXO', 'OOOO', 'OOOO'], // park
      ['E 1', 'S 1', 'E 2'], // routes
    ],
    output: [1, 3],
  },
];

// 시작점(S)를 찾는다. [y, x]
// 명령어가 공원을 넘어 갔는지 확인한다
// 명령어가 장애물을 만났는지 확인한다
// E(+) | W(-) = x 이동,
// S(+) | N(-) = y 이동

function solution(park, routes) {
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

  routes.forEach(route => {
    const [dir, count] = route.split(' ');
    const isIncrease = dir === 'E' || dir === 'S';
    const isHorizontal = dir === 'E' || dir === 'W';
    const axis = isHorizontal ? 'x' : 'y';
    const toAxis = current[axis] + (isIncrease ? +count : -+count);
    const target = isHorizontal ? park[current.y] : park;
    if (validator(target, axis, toAxis, isIncrease)) current[axis] = toAxis;
  });

  return [current.y, current.x];
}

solution(...cases[2].input);
