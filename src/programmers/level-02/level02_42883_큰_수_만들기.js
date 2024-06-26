import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 수를 구하는 문제
 * e.g. 숫자 1924에서 2개의 수를 제거하면 [19, 12, 14, 92, 94, 24]를 만들 수 있고 이 중 가장 큰 숫자는 94
 * 문자열 형식의 숫자 number와 제거할 수의 개수 k가 주어졌을 때 number에서 k개의 수를 제거했을 때
 * 만들 수 있는 가장 큰 숫자를 문자열 형태로 반환
 *
 * [파라미터]
 * number: 2자리 이상, 1,000,000자리 이하 숫자
 * k: 1이상 number.length 미만의 자연수
 *
 * [해결방법]
 * 원본 숫자를 순회하면서 현재 숫자가 stack의 마지막 숫자보다 크면,
 * stack의 마지막 숫자를 제거한 후 현재 숫자 push
 * 이 방식으로 큰 숫자가 앞에 위치하도록 조정하고, 작은 숫자를 제거할 때마다 k--
 * 현재 순회하는 숫자가 stack의 마지막 숫자보다 크지 않다면 stack에 그냥 push
 */

function solution(number, k) {
  const stack = [];
  let count = k;

  for (const num of number) {
    // stack 배열의 마지막 숫자가 현재 숫자보다 작으면 제거 후 k--
    // 큰 숫자가 앞에 위치하도록 하기 위해 k번 만큼 반복
    while (count > 0 && stack.length > 0 && stack.at(-1) < num) {
      stack.pop();
      count--;
    }
    stack.push(num);
  }

  // k가 아직 남아 있다면, 끝에서부터 k만큼 제거
  return stack.slice(0, stack.length - count).join('');
}

const cases = [
  generateTestPair(['1924', 2], '94'),
  generateTestPair(['1231234', 3], '3234'),
  generateTestPair(['4177252841', 4], '775841'),
  generateTestPair(['54321', 2], '543'),
];

cases.forEach(({ input, output }) => {
  console.log(solution(...input) === output);
});

/**
 * [시뮬레이션]
 * number='1231234', k=3
 * stack = []
 * i0(1) 스택 비어있음 | push(1) -> [1]
 * i1(2) 스택 마지막 숫자보다 큼 | pop() 1회 -> [] | k - 1(2) | push(2) -> [2]
 * i2(3) 스택 마지막 숫자보다 큼 | pop() 1회 -> [] | k - 1(1) | push(3) -> [3]
 * i3(1) 스택 마지막 숫자보다 크지 않음 | push(1) -> [3, 1]
 * i4(2) 스택 마지막 숫자보다 큼 | pop() 1회 -> [3] | k - 1(0) | push(2) -> [3, 2]
 * 나머지 push -> [3, 2, 3, 4]
 *
 * number='4177252841', k=4
 * stack = []
 * i0(4) 스택 비어있음 | push(4) -> [4]
 * i1(1) 스택 마지막 숫자보다 크지 않음 | push(1) -> [4, 1]
 * i2(7) 스택 마지막 숫자보다 큼 | pop() 2회 -> [] | k - 2(2) | push(7) -> [7]
 * i3(7) 스택 마지막 숫자보다 크지 않음 | push(7) -> [7, 7]
 * i4(2) 스택 마지막 숫자보다 크지 않음 | push(2) -> [7, 7, 2]
 * i5(5) 스택 마지막 숫자보다 큼 | pop() 1회 -> [7, 7] | k - 1(1) | push(5) -> [7, 7, 5]
 * i6(2) 스택 마지막 숫자보다 크지 않음 | push(2) -> [7, 7, 5, 2]
 * i7(8) 스택 마지막 숫자보다 큼 | pop() 1회 -> [7, 7, 5] | k - 1(0) | push(8) -> [7, 7, 5, 8]
 * 나머지 push -> [7, 7, 5, 8, 4, 1]
 */
