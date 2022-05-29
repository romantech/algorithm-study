// 문제2. 사용하지 않는 가장 작은 숫자 찾기
const findUnusedMinNum = ids => {
  const sortedNum = [...new Set(ids.sort((a, b) => a - b))];
  const len = sortedNum.length;
  const lastNum = sortedNum[len - 1];

  if (lastNum === len - 1) {
    return lastNum + 1;
  }

  for (let i = 0; i < len; i += 1) {
    if (sortedNum.includes(i) === false) {
      return i;
    }
  }
};

// 문제2. 테스트
const testCase2 = [
  {
    input: [0, 1, 2, 4],
    expectedResult: 3,
  },
  {
    input: [0, 1, 2, 3, 4, 5, 6],
    expectedResult: 7,
  },
  {
    input: [9, 1, 1, 2, 9, 8, 0, 88],
    expectedResult: 3,
  },
];

testCase2.forEach(({ input, expectedResult }) =>
  console.log('문제2', {
    input,
    output: findUnusedMinNum(input),
    passed: findUnusedMinNum(input) === expectedResult,
  }),
);
