import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 *
 * 0과 1로 이뤄진 문자열 s가 매개변수로 주어질 때 s가 1이 될 때까지 계속해서 이진 변환을 수행하고,
 * 이진 변화의 횟수와 변화 과정에서 제거된 모든 0의 개수를 각각 배열에 담아서 반환
 * 예를들어 s = "110010101001"이라면...
 * 1. "0" 6개 제거 -> "110" -> 길이 6에 대한 이진 변환 "110"
 * 2. "0" 1개 제거 -> "11" -> 길이 2에 대한 이진 변환 "10"
 * 3. "0" 1개 제거 -> "1"  -> "1"
 * 총 3번의 이진 변환을 수행하고 0을 8개 제거했으므로 [3, 8] 반환
 *
 * [제한사항]
 * s : 길이 1 이상 150,000 이하
 * s엔 1이 최소 1개 이상 포함되어 있음
 *
 */

function solution(s) {
  if (s.length <= 1) return [0, 0];

  const ones = s.match(/1/g) ?? [];
  const zeroCount = s.length - ones.length;
  const newStr = ones.length.toString(2);

  const [transformations, zerosRemoved] = solution(newStr);
  // [0, 0] -> return [1, 1]
  // [1, 1] -> return [2, 2]
  // [2, 2] -> return [3, 8]

  return [transformations + 1, zerosRemoved + zeroCount];
}

const cases = [
  generateTestPair(['110010101001'], [3, 8]),
  generateTestPair(['01110'], [3, 3]),
  generateTestPair(['1111111'], [4, 1]),
];

cases.forEach(({ input, output }, i) => {
  const result = solution(...input);
  const passed = result.join('') === output.join('');
  console.log(`${i + 1}번 테스트 ${passed ? '통과' : '실패'}`);
});
