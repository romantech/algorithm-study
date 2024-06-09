import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 양의 정수 x에 대한 함수 f(x)는 아래와 같이 정의:
 * x 보다 크고 x와 비트가 1개 혹은 2개 다른 수들 중에서 제일 작은 수
 * 예를들어 f(2) = 3이 된다.
 * 2 이진수 = 0010
 * 3 이진수 = 0011 (다른 비트의 개수 1)
 *
 * f(7) = 11
 * 7 이진수 = 0111
 * 8 이진수 = 1000 (다른 비트의 개수 4)
 * 9 이진수 = 1001 (다른 비트의 개수 3)
 * 10 이진수 = 1010 (다른 비트의 개수 2)
 * 11 이진수 = 1011 (다른 비트의 개수 2)
 *
 * [제한사항]
 * 1 <= numbers 길이 <= 100,000
 * 0 <= numbers[i] <= 10^15
 *
 * [규칙]
 * 짝수인 2진수에서 가장 오른쪽 숫자는 항상 0이 됨. 여기에 1을 더하면,
 * 다른 비트가 1인 제일 작은 수를 만들 수 있음
 * 1010 (10)
 * 1011 (11) - 다른 비트의 개수 1
 *
 * 반면 홀수에 1을 더하면 다른 비트의 개수가 2개를 초과하는 경우 존재
 * 예를 들어 95의 이진수는 1011111이고 여기에 1을 더하면 1100000이 돼서, 다른 비트는 6개가 됨
 * 따라서 홀수는 가장 오른쪽에 있는 0을 1로 바꾸고, 그 뒤의 값을 1로 바꾸는 방식으로 다른 비트가 항상 2개가 되도록 만들 수 있음

 * 1011111 (95)
 * 1101111 (111) - 다른 비트의 개수 2
 *
 * 참고로 자바스크립트에서 비트 연산은 32비트 정수로 처리함. 예를들어 3의 이진수는 ...00011
 * 하지만 toString(2) 메서드는 앞의 0을 생략하고 반환하기 때문에 0을 따로 붙여줘야 함
 * 111 -> 0111 (3)
 * 1011 (11) - 다른 비트의 개수 2
 */

function solution(numbers) {
  return numbers.map(n => {
    if (n % 2 === 0) return n + 1;
    const bit = '0' + n.toString(2);
    const idx = bit.lastIndexOf('0');
    const min = bit.slice(0, idx) + '10' + bit.slice(idx + 2);
    return parseInt(min, 2);
  });
}

const cases = [generateTestPair([[2, 7]], [3, 11]), generateTestPair([[99, 9231]], [101, 9239])];

cases.forEach(({ input, output }, i) => {
  const result = solution(...input);
  const msg = result.every((r, idx) => r === output[idx]) ? '통과' : '실패';
  console.log(`${i + 1}번 케이스 ${msg}`);
});
