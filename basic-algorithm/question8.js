// 문제8. 아이큐 테스트
// 홀수 / 짝수 중에 하나만 존재하는 값의 순번을 출력하는 함수

const findLonelyNumber = numbers => {
  const numbersArray = numbers.split(' ').map(num => parseInt(num, 10));
  // solution 1
  // const odd = numbersArray.filter(number => number % 2 !== 0); // 홀수
  // const even = numbersArray.filter(number => number % 2 === 0); // 짝수
  // const selectedNum = (odd.length > even.length ? even : odd)[0];
  // return numbersArray.findIndex(num => num === selectedNum) + 1;

  // solution 2
  const initial = { odd: [], even: [] };
  const { odd, even } = numbersArray.reduce((acc, cur, idx) => {
    const type = cur % 2 === 0 ? 'even' : 'odd';
    acc[type].push(idx + 1);
    return acc;
  }, initial);

  return odd.length > even.length ? even[0] : odd[0];
};

// 문제8. 테스트
const testCase8 = [
  {
    input: '2 4 7 8 10',
    expectedResult: 3,
  },
  {
    input: '1 2 1 1',
    expectedResult: 2,
  },
  {
    input: '22 21 101 87 37 103',
    expectedResult: 1,
  },
];

testCase8.forEach(({ input, expectedResult }) =>
  console.log('문제8', {
    input,
    output: findLonelyNumber(input),
    passed: findLonelyNumber(input) === expectedResult,
  }),
);
