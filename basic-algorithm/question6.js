// 문제6. 중간 숫자 찾기. 3개 숫자 중에 2번째 크기의 숫자를 찾는 함수

const findMiddleNum = nums => {
  const sorted = nums.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return sorted[middle - 1];
  }
  return sorted[middle];
};

// 문제6. 테스트
const testCase6 = [
  {
    input: [0, 1, 2],
    expectedResult: 1,
  },
  {
    input: [5, 1, 2],
    expectedResult: 2,
  },
  {
    input: [-23, 0, -9],
    expectedResult: -9,
  },
];

testCase6.forEach(({ input, expectedResult }) =>
  console.log('문제6', {
    input,
    output: findMiddleNum(input),
    passed: findMiddleNum(input) === expectedResult,
  }),
);
