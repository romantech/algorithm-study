// n번째 피보나치수를 1234567로 나눈 나머지 값 반환 (0~1 피보나치수는 그대로 반환)

function solution(n) {
  const memo = [0, 1];
  const MOD = 1234567;

  for (let i = 2; i <= n; i += 1) {
    memo[i] = (memo[i - 1] + memo[i - 2]) % MOD;
  }

  return memo[n];
}

const cases = [
  {
    input: 3, // n
    output: 2,
  },
  {
    input: 5, // n
    output: 5,
  },
];

cases.forEach(({ input, output }) => {
  console.log(solution(input) === output);
});
