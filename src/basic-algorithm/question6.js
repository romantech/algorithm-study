// 문제6. 중간 숫자 찾기. 3개 숫자 중에 2번째 크기의 숫자를 찾는 함수

const findMiddleNum = (nums) => {
  return nums.sort((a, b) => a - b)[1];
};

// 문제6. 테스트
const testCase6 = [
  {
    input: [2, 1, 0],
    expectedResult: 1,
  },
  {
    input: [99, 30, 20],
    expectedResult: 30,
  },
  {
    input: [1, -88, 0],
    expectedResult: 0,
  },
];

testCase6.forEach(({ input, expectedResult }) =>
  console.log('문제6', {
    input,
    output: findMiddleNum(input),
    passed: findMiddleNum(input) === expectedResult,
  }),
);
