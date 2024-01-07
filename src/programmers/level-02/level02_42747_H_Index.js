import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * H-Index는 과학자의 생산성과 영향력을 나타내는 지표.
 * 연구자가 발표한 논문 중 최소 H편이 각각 H번 이상 인용된 경우의 H 최대값.
 * 즉, 인용 횟수가 논문의 수와 같거나 큰 경우 그 숫자가 H-Index가 됨.
 * 주의할 점은 논문의 수와 그 논문들이 받은 인용 횟수가 모두 H 이상이어야 함
 *
 * [파라미터]
 * citations: 인용 횟수 0 이상 10,000이하
 * 과학자가 발표한 논문의 수(n)은 1 이상 1,000이하
 *
 * [예시]
 * citations : [3, 0, 6, 1, 5] -> 내림차순 정렬 [6, 5, 3, 1, 0]
 * 발표한 논문의 수 : 5 (ciatations.length)
 * 0회 이상 인용된 논문 5편 : 인용 횟수가 h보다 적음
 * 1회 이상 인용된 논문 4편 : 인용 횟수가 h보다 적음
 * 3회 이상 인용된 논문 3편 : 3회 이상 인용된 논문이 3개로 같으므로 H-Index 3
 * 5회 이상 인용된 논문 2편 : 5회 이상 인용된 논문이 5개 미만
 * 6회 이상 인용된 논문 1편 : 6회 이상 인용된 논문이 6개 미만
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
