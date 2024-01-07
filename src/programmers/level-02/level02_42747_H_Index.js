import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * H-Index는 과학자의 생산성과 영향력을 나타내는 지표.
 * 연구자가 발표한 논문 중 최소 H편이 H번 이상 인용된 경우에 대한 H의 최대값.
 * 주의할 점은 논문의 수와 그 논문들이 받은 인용 횟수가 모두 H 이상이어야 함.
 * 따라서 논문 n편 중 a번 이상 인용된 논문이 b편 이상이면, a, b 중 작은 값이 H-Index가 된다
 *
 * [파라미터]
 * citations: 인용 횟수 0 이상 10,000이하
 * 과학자가 발표한 논문의 수(n)은 1 이상 1,000이하
 *
 * [예시]
 * citations : [3, 0, 6, 1, 5] -> 내림차순 정렬 [6, 5, 3, 1, 0]
 * 발표한 논문의 수 : 5 (ciatations.length)
 * [6회] 이상 인용된 논문 [1편] : min(6, 1) -> 1
 * [5회] 이상 인용된 논문 [2편] : min(5, 2) -> 2
 * [3회] 이상 인용된 논문 [3편] : min(3, 3) -> 3 (H의 최대값)
 * [1회] 이상 인용된 논문 [4편] : min(1, 4) -> 1
 * [0회] 이상 인용된 논문 [5편] : min(0, 5) -> 0
 */

function solution(citations) {
  // H-Index는 H의 최대값을 찾아야 하기 때문에 인용된 횟수로 내림차순 정렬
  const sortedCites = citations.sort((a, b) => b - a);

  return sortedCites.reduce((maxHIndex, cites, idx) => {
    const paperCount = idx + 1;
    const hIndex = Math.min(cites, paperCount);
    return Math.max(maxHIndex, hIndex);
  }, 0);
}

const cases = [
  generateTestPair([[3, 0, 6, 1, 5]], 3),
  generateTestPair([[1, 9, 6, 2, 7]], 3),
];

cases.forEach(({ input, output }) => {
  console.log(solution(...input) === output);
});
