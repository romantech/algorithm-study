function solution(number) {
  const splitNum = number.split('');
  const len = splitNum.length - 4;

  return splitNum.reduce((acc, cur, idx) => {
    if (idx >= len) return acc.concat(cur);
    return acc.concat('*');
  }, '');
}

// reference
function solution2(s) {
  return '*'.repeat(s.length - 4) + s.slice(-4);
  // '*'.repeat(s.length -4) -> 파라미터 뒷 4자리를 제외한 length 만큼 '*' 문자열 생성
  // s.slice(-4) -> 뒤에서 4자리만큼 자르기
  // ex) '123456789'.slice(-4) -> '6789'
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
    output: solution2(input),
    passed: solution2(input) === expectedResult,
  }),
);
