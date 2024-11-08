import { generateTestPair } from '../../utils.js';
import { isPrime } from '../../math.js';

/**
 * [요구사항]
 * 양의 정수 n이 주어지고, 이 숫자를 k진수로 바꿨을 때 아래 조건에 맞는 소수가 몇개인지 계산
 * 소수 양쪽에 0이 있는 경우 예) 0P0
 * 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우 예) P0
 * 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우 예) 0P
 * 소수 양쪽에 아무것도 없는 경우 P (각 자릿수에 0을 포함하지 않음)
 *
 *
 * [예시]
 * 437674를 3진수로 바꾸면 211020101011 되고, 조건에 맞는 소수는...
 * 0P0: 2
 * P0: 211
 * 0P: 11
 *
 * 110011을 10진수로 바꾸면 110011을 되고, 조건에 맞는 소수는...
 * P0: 11
 * 0P: 11
 *
 * 정수 n과 k가 매개변수로 주어지고 n을 k진수로 바꿨을 때 조건에 맞는 소수 개수 반환
 *
 * [제한사항]
 * 1 <= n <= 1,000,000
 * 3 <= k <= 10
 * */

const isZero = (n) => n === '0';

function solution(n, k) {
  const convertedNumStr = n.toString(k);
  let curNumStr = '';
  let lastZeroIdx = 0;
  let result = 0;

  for (let i = 0; i < convertedNumStr.length; i++) {
    const cur = convertedNumStr[i];
    if (!isZero(cur)) curNumStr += cur;
    if (isZero(cur) || i === convertedNumStr.length - 1) {
      let j = i;

      while (j-- >= lastZeroIdx) {
        const charBeforeZero = convertedNumStr[j];

        if ((!charBeforeZero || isZero(charBeforeZero)) && isPrime(+curNumStr)) {
          result++;
          lastZeroIdx = j;
          break;
        }
      }

      curNumStr = '';
    }
  }

  return result;
}

const cases = [
  generateTestPair([437674, 3], 3), // 3개
  generateTestPair([110011, 10], 2), // 2개
];

cases.forEach(({ input, output }, i) => {
  const res = solution(...input);
  const msg = res === output ? '통과' : '실패';
  console.log(`${i + 1}번 케이스 ${msg}`);
});
