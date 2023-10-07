// 주어진 숫자 n을 1과 2로 표현할 수 있는 모든 방법의 개수를 찾는 문제
// 방법의 개수를 알아낸 후 1234567로 나눈 나머지 리턴 (중간 과정도 나눠야함)
// n에 대한 방법의 개수는 피보나치수열 원리와 동일
// 1 <= n <= 2000

function solution(n) {
  const memo = [1, 1];

  for (let i = 2; i <= n; i += 1) {
    memo[i] = (memo[i - 1] + memo[i - 2]) % 1234567;
  }

  return memo[n];
}

const cases = [
  {
    input: 1,
    output: 1,
  },
  {
    input: 2,
    output: 2, // [1, 1], [2]
  },
  {
    input: 3,
    output: 3, // [1, 1, 1], [1, 2], [2, 1]
  },
  {
    input: 4,
    output: 5, // [1, 1, 1, 1], [1, 2, 1], [1, 1, 2], [2, 1, 1], [2, 2]
  },
];

cases.forEach(({ input, output }) => {
  console.log(solution(input) === output);
});
