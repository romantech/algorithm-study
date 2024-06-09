import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 양의 정수 x에 대한 함수 f(x)는 아래와 같이 정의:
 * x 보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수
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
 * 0 <= numbers 모든 수 <= 10^15
 */

function solution(numbers) {
  const answer = [];
  return answer;
}

const cases = [generateTestPair([[2, 7]], [3, 11])];
