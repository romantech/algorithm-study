function solution(number) {
  const splitNum = number.split('');
  const len = splitNum.length - 4;

  return splitNum.reduce((acc, cur, idx) => {
    if (idx >= len) return acc.concat(cur);
    return acc.concat('*');
  }, '');
}

const testCase = [
  {
    input: '01033334444',
    expectedResult: '*******4444',
  },
  {
    input: '027778888',
    expectedResult: '*****8888',
  },
];

testCase.forEach(({ input, expectedResult }) =>
  console.log('핸드폰 번호 가리기', {
    input,
    output: solution(input),
    passed: solution(input) === expectedResult,
  }),
);
