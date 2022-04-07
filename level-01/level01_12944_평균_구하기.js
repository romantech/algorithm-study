// 정수를 담고 있는 배열 arr 의 평균값을 return 하는 함수
// arr 길이는 1 이상 100이하
// arr 요소는 -10000 이상 10000이하

function solution(arr) {
  return arr.reduce((acc, cur) => acc + cur) / arr.length;
}

const testCase = [
  {
    input: [1, 2, 3, 4],
    expectedResult: 2.5,
  },
  {
    input: [5, 5],
    expectedResult: 5,
  },
];

testCase.forEach(({ input, expectedResult }) =>
  console.log('12944', {
    input,
    output: solution(input),
    passed: solution(input) === expectedResult,
  }),
);
