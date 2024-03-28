// 정수 x와 자연수 n을 받아 x 부터 시작해 x 씩 증가하는 숫자를 n개 지니는 리스트 리턴
function solution(x, n) {
  return Array(n)
    .fill(x)
    .reduce((acc, cur, idx) => {
      const num = idx === 0 ? cur : acc[acc.length - 1] + cur;
      return acc.concat(num);
    }, []);
}

// reference
function solution2(x, n) {
  return Array(n)
    .fill(x)
    .map((v, i) => (i + 1) * v); // 1 * 2 -> 2 * 2 -> 3 * 2 -> 4 * 2 -> 5 * 2
}

const testCase = [
  {
    input: { x: 2, n: 5 },
    expectedResult: [2, 4, 6, 8, 10],
  },
  {
    input: { x: 4, n: 3 },
    expectedResult: [4, 8, 12],
  },
  {
    input: { x: -4, n: 2 },
    expectedResult: [-4, -8],
  },
];

testCase.forEach(({ input, expectedResult }) =>
  console.log('level01_12954', {
    input,
    output: solution(input.x, input.n),
    passed: solution(input.x, input.n).every((num, idx) => num === expectedResult[idx]),
  }),
);
