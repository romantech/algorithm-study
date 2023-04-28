// 음식 배치 반환
// left + 0 + right 형식
// food 배열은 칼로리가 낮은 순서
// 1은 버리고, 2~3는 1, 4부턴 나눈 몫
function solution(food) {
  let left = '';

  for (let i = 0; i < food.length; i += 1) {
    // 1 / 2 = 0.5 -> parseInt(0.5) -> 0
    const count = parseInt(food[i] / 2, 10);
    const counted = String(i).repeat(count);
    left += counted;
  }

  return left + 0 + [...left].reverse().join('');
}

const cases = [
  { input: [1, 3, 4, 6], output: '1223330333221' },
  { input: [1, 7, 1, 2], output: '111303111' },
];

solution(cases[1].input);
