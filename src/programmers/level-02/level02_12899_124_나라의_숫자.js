// 10진법 숫자를 받아 3진법으로 변환하는 문제
// 3진법 계산시 012를 사용하지만 문제에선 124만 사용하므로 0을 4로 변경해줘야 함
// 나머지를 0 -> 4로 변환했다면, 몫 - 1을 값을 피제수로해서 다음 숫자 계산
// 몫이 0혹은 1이 될때까지 나눔

// 10진수 7 변환
// 7 / 3 = 2 (나머지 1) 1
// 2 / 3 = 0 (나머지 2) 2

// 10진수 3 변환
// 3 / 3 = 1 (나머지 0) 4

// 10진수 6 변환
// 6 / 3 = 2 (나머지 0) 4 -> 0을 4로 변환했으므로 몫 - 1
// (2 - 1) / 3 = 0 (나머지 1) 1

// 10진수 9 변환
// 9 / 3 = 3 (나머지 0) 4 -> 0을 4로 변환했으므로 몫 - 1
// (3 - 1) / 3 = 0 (나머지 2) 2

// 10진수 10 변환
// 10 / 3 = 3 (나머지 1) -> 1
// 3 / 3 = 0 (0) -> 4

function solution(n) {
  let result = '';
  let currentNumber = n;

  while (currentNumber > 0) {
    const remainder = currentNumber % 3;
    const isRemainderZero = remainder === 0;
    result = `${isRemainderZero ? 4 : remainder}${result}`;

    currentNumber = Math.floor(currentNumber / 3);
    if (isRemainderZero) currentNumber--;
  }

  return result;
}

const testCase = [
  {
    input: 1, // 10진법
    output: 1, // 3진법
  },
  {
    input: 2, // 10진법
    output: 2, // 3진법
  },
  {
    input: 3, // 10진법
    output: 4, // 3진법
  },
  {
    input: 4, // 10진법
    output: 11, // 3진법
  },
  {
    input: 5, // 10진법
    output: 12, // 3진법
  },
  {
    input: 6, // 10진법
    output: 14, // 3진법
  },
  {
    input: 7, // 10진법
    output: 21, // 3진법
  },
  {
    input: 8, // 10진법
    output: 22, // 3진법
  },
  {
    input: 9, // 10진법
    output: 24, // 3진법
  },
  {
    input: 10, // 10진법
    output: 41, // 3진법
  },
];

testCase.forEach(({ input, output }, i) => {
  console.log(i + 1, solution(input) === String(output));
});
