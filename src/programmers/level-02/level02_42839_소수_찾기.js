import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때,
 * 종이 조각으로 만들 수 있는 소수가 몇 개인지 계산해서 return
 * 소수는 1과 자기 자신만으로 나누너 떨어지는 1보다 큰 자연수
 *
 * [파라미터]
 * numbers : 길이 1 이상 7 이하인 문자열, 0~9로만 이루어져 있음
 * "013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미
 *
 * [예시]
 * numbers: "17" -> [1, 7] 숫자를 조합해 [7, 17, 71] 소수를 만들 수 있으므로 return 3
 * numbers: "011" -> [0, 1, 1] 숫자를 조합해 [11, 101] 소수를 만들 수 있으므로 return 2
 * 11과 011은 같은 숫자로 취급
 */

function solution(numbers) {
  const answer = 0;
  return answer;
}

const cases = [generateTestPair(['17'], 3), generateTestPair(['011'], 2)];
