// 문제4. 더하고 빼기
// 각 자리의 숫자를 더한 값을 원래 숫자에서 빼고, 숫자에 해당하는 과일코드가 나올때까지 계산하는 함수

const subtractTheSum = num =>
  [...String(num)].reduce((acc, digit) => acc - digit, num);
// [...'325'] -> ['3', '2', '5']
// 325 : 325 - '3' - '2' - '5' = 315
// 315 : 315 - '3' - '1' - '5' = 306
// ...

const findFruit = input => {
  // 10 이상 결과는 항상 'apple'이므로 apple에 해당하는 숫자만 추출
  const appleNum = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99];
  return appleNum.includes(input) ? '🍎🍏' : findFruit(subtractTheSum(input));
};

// 문제4. 테스트
const testCase4 = [
  {
    input: 10, // 10, 9
    expectedResult: '🍎🍏',
  },
  {
    input: 325, // ...108, 99
    expectedResult: '🍎🍏',
  },
  {
    input: 2022, // ...108, 99
    expectedResult: '🍎🍏',
  },
  {
    input: 211, // ...108, 99
    expectedResult: '🍎🍏',
  },
];

testCase4.forEach(({ input, expectedResult }) =>
  console.log('문제4', {
    input,
    output: findFruit(input),
    passed: findFruit(input) === expectedResult,
  }),
);
