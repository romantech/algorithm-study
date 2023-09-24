// 가로 길이 2, 세로 길이가 1인 직사각형 타일을,
// 세로 길이 2, 가로 길이 n인 바닥을 채울 수 있는 경우의 수 계산
// 가로 길이 n <= 60,000
// 결과는 1,000,000,007으로 나눈 나머지 리턴

// n === 1 -> 경우의 수 1
// n === 2 -> 경우의 수 2
// n === 3 -> 경우의 수 3
// n === 4 -> 경우의 수 5
// n === 5 -> 경우의 수 8

// 경우의 수는 n에 대한 피보나치 수열과 동일
function solution(n) {
  const MODULO = 1_000_000_007;

  if (n <= 3) return n;

  let prevPrev = 2;
  let prev = 3;
  let current;

  for (let i = 4; i <= n; i++) {
    current = (prevPrev + prev) % MODULO;
    prevPrev = prev;
    prev = current;
  }

  return current;
}

const cases = [
  {
    input: 0,
    output: 0,
  },
  {
    input: 1,
    output: 1,
  },
  {
    input: 2,
    output: 2,
  },
  {
    input: 3,
    output: 3,
  },
  {
    input: 4,
    output: 5,
  },
  {
    input: 5,
    output: 8,
  },
];
