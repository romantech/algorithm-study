/* eslint-disable no-param-reassign,no-unused-expressions */
// 수가 짝수면 2로 나누고 홀수면 3 곱한 후 1 더하기
// 같은 작업을 1이 될때까지 반복
// 위 작업을 몇번 반복해야지 1이 나오는지 반환하는 함수 작성
// 500번 반복해도 1이 나오지 않는다면 -1 반환

function solution(num) {
  if (num === 1) {
    return 0;
  }

  for (let i = 1; i <= 500; i += 1) {
    num = num % 2 === 0 ? (num /= 2) : (num = num * 3 + 1);
    if (num === 1) return i;
  }

  return -1;
}

const testCase = [
  {
    input: 6,
    expectedResult: 8, // 6 > 3 > 10 > 5 > 16 > 8 > 4 > 2 > 1
  },
  {
    input: 16,
    expectedResult: 4,
  },
  {
    input: 626331,
    expectedResult: -1,
  },
];

testCase.forEach(({ input, expectedResult }) =>
  console.log({
    input,
    output: solution(input),
    passed: solution(input) === expectedResult,
  }),
);

// 레퍼런스1 (재귀함수 활용)
function solution2(num, count = 0) {
  if (count > 500) return -1;

  return num === 1 ? count : solution2(num % 2 === 0 ? num / 2 : num * 3 + 1, ++count);
}

// 레퍼런스2 (while 루프 활용)
function solution3(num) {
  let answer = 0;
  while (num !== 1 && answer <= 500) {
    num % 2 === 0 ? (num /= 2) : (num = num * 3 + 1);
    answer++;
  }
  return num === 1 ? answer : -1;
}
