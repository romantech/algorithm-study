import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 순서를 따르는 요소들의 모음을 튜플(tuple)이라고 함
 * n개의 요소를 가진 튜플을 n-tuple이라고 부르며, 아래처럼 표현할 수 있음
 * (a1, a2, a3, ..., an)
 *
 * 튜플은 아래와 같은 성질을 가지고 있음
 * 1. 중복되 원소가 있을 수 있음 e.g. (2, 3, 1, 2)
 * 2. 원소에 정해진 순서가 있으며, 원소의 순서가 다르면 서로 다른 튜플 e.g. (1, 2, 3) ≠ (1, 3, 2)
 * 3. 튜플 원소 개수는 유한함
 *
 * 요소 개수가 n개이고 중복되는 원소가 없는 튜플 (a1, a2, a3, ..., an)이 주어질 때 아래처럼 집합 기호 {, }를 이용해 표현
 * {{a1}, {a1, a2}, {a1, a2, a3}, {a1, a2, a3, a4}, ... {a1, a2, a3, a4, ..., an}}
 *
 * 예를들어 튜플이 (2, 1, 3, 4)라면 아래처럼 표현할 수 있음
 * {{2}, {2, 1}, {2, 1, 3}, {2, 1, 3, 4}}
 *
 * 집합은 원소의 순서가 바뀌어도 상관없으므로 아래는 모두 같은 튜플 (2, 1, 3, 4)를 나타냄
 * {{2}, {2, 1}, {2, 1, 3}, {2, 1, 3, 4}}
 * {{2, 1, 3, 4}, {2}, {2, 1, 3}, {2, 1}}
 * {{1, 2, 3}, {2, 1}, {1, 2, 4, 3}, {2}}
 *
 * 특정 튜플을 표현하는 집합이 담긴 문자열 s가 매개변수로 주어질 때, s가 표현하는 튜플을 배열에 담아서 리턴
 *
 * [제한사항]
 * - s의 길이는 5 이상 1,000,000 이하
 * - s는 숫자와 { }로만 이루어져 있음
 * - 숫자가 0으로 시작하는 경우는 없음
 * - s는 항상 중복되는 원소가 없는 튜플을 올바르게 표현하고 있음
 * - s가 표현하는 튜플의 원소는 1이상 100,000 이하인 자연수
 * - return 하는 배열 길이가 1 이상 500 이하인 경우만 입력으로 주어짐
 */

const toArray = tupleString => {
  const innerContent = tupleString.slice(2, -2);
  const tupleStrings = innerContent.split('},{');
  return tupleStrings.map(tuple => tuple.split(','));
};

function solution(s) {
  const tupleArrays = toArray(s);
  const sortedByLength = tupleArrays.sort((a, b) => a.length - b.length);

  const uniqueElements = sortedByLength.reduce((result, tuple) => {
    tuple.forEach(t => result.add(Number(t)));
    return result;
  }, new Set());

  return [...uniqueElements];
}

const cases = [
  generateTestPair(['{{2},{2,1},{2,1,3},{2,1,3,4}}'], [2, 1, 3, 4]),
  generateTestPair(['{{1,2,3},{2,1},{1,2,4,3},{2}}'], [2, 1, 3, 4]),
  generateTestPair(['{{20,111},{111}}'], [111, 20]),
  generateTestPair(['{{123}}'], [123]),
  generateTestPair(['{{4,2,3},{3},{2,3,4,1},{2,3}}'], [3, 2, 4, 1]),
];

console.log(solution(...cases[4].input));
