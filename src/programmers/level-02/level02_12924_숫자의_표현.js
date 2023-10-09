// n을 인자로 받아, 연속된 자연수의 합으로 n을 나타내는 방법의 수 반환
// n은 10000이하의 자연수

// 1부터 n까지 차례대로 더해서 n과 같은 수를 찾는 방법
// n이 15라면, 1부터 시작해서
// i === 1 : 1, 2, 3, 4, 5 (ok)
// i === 2 : 2, 3, 4, 5, 6
// i === 3 : 3, 4, 5, 6
// i === 4 : 4, 5, 6 (ok)
// ...반복
function solution(n) {
  let answer = 1; // n 자기 자신

  // 시작 숫자가 n/2를 초과하면 n보다 커지므로 n/2 미만까지만 반복
  // 예) n이 15라면 n/2=7.5 -> 7.5보다 큰 수인 8부턴 n보다 커지게 됨 (8+9=17)
  for (let start = 1; start < n / 2; start++) {
    let sum = 0;
    for (let i = start; sum < n; i++) {
      // sum(0) + i(1) = 1
      // sum(1) + i(2) = 3
      // sum(3) + i(3) = 6
      // sum(6) + i(4) = 10
      // sum(10) + i(5) = 15
      sum += i;
    }

    if (sum === n) answer++;
  }

  return answer;
}

const cases = [
  {
    input: 1,
    output: 1, // [1]
  },
  {
    input: 2,
    output: 1, // [2]
  },
  {
    input: 3,
    output: 2, // [1, 2], [3]
  },
  {
    input: 4,
    output: 1, // [4]
  },
  {
    input: 15, // [1, 2, 3, 4, 5], [4, 5, 6], [7, 8], [15]
    output: 4,
  },
];

cases.forEach(({ input, output }) => {
  console.log(solution(input) === output);
});
