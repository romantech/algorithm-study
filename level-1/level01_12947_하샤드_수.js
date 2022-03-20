// 인자 x가 하샤드 수인지 판별하는 함수
// 하샤드 수 각 자리수의 합으로 나누어 떨어지는 수
// 숫자 18의 각 자리수 합은 1+8=9 이고, 18/9는 나누어떨어지므로 하샤드 수

function solution(x) {
  const sum = String(x)
    .split('')
    .reduce((acc, cur) => +acc + +cur);
  return x % sum === 0;
}

const testCase = [
  {
    input: 10,
    expectedResult: true,
  },
  {
    input: 12,
    expectedResult: true,
  },
  {
    input: 11,
    expectedResult: false,
  },
  {
    input: 13,
    expectedResult: false,
  },
];

testCase.forEach(({ input, expectedResult }) =>
  console.log('12947', {
    input,
    output: solution(input),
    passed: solution(input) === expectedResult,
  }),
);
