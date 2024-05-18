import { generateTestPair } from '../../utils.js';
import { getCombinationsIterative } from '../../math.js';

/**
 * [요구사항]
 * 후보키는 관계형 DB에서 릴레이션의 튜플을 유일하게 식별할 수 있는 속성(Attribute) 또는 속성의 집합으로 아래 두 성질을 만족해야 한다.
 * 1. 유일성: 릴레이션에 있는 모든 튜플에 대해 유일하게 식별되어야 한다
 * 2. 최소성: 릴레이션의 모든 튜플을 유일하게 식별하는 데 꼭 필요한 속성들로만 구성되어야 한다
 *
 * 학생들에 대한 인적사항이 주어졌을 때, 후보 키의 최대 개수를 구한 뒤 반환
 *
 * 예를들어 아래와 같은 인적사항이 주어졌을 때...
 *
 * | 학번  |  이름   |  전공     | 학년 |
 * |------|--------|----------|------|
 * | 100  | ryan   | music    | 2    |
 * | 200  | apeach | math     | 2    |
 * | 300  | tube   | computer | 3    |
 * | 400  | con    | computer | 1    |
 * | 500  | muzi   | music    | 3    |
 * | 600  | apeach | music    | 2    |
 *
 * - 모든 학생은 각자 유일한 "학번"을 가지고 있으므로 후보 키가 될 수 있다.
 * - 같은 이름을 사용하는 학생이 있기 때문에 "이름"은 후보 키가 될 수 없다.
 * - ["이름", "전공"]을 함께 사용한다면 릴레이션의 모든 튜플을 유일하게 식별할 수 있으므로 후보키가 될 수 있다
 * - ["이름", "전공", "학년"]을 함께 사용해도 릴레이션의 모든 튜플을 유일하게 식별할 수 있지만, 최소성을 만족하지 못해서 후보키가 될 수 없다.
 * - 따라서 후보키는 "학번", ["이름", "전공"] 2개가 된다
 *
 * [제한사항]
 * relation: 릴레이션을 나타내는 2차원 문자열 배열
 * relation 컬럼(column) 길이는 1 이상 8 이하, 각각의 컬럼은 릴레이션 속성을 나타냄
 * relation 로우(row) 길이는 1 이상 20 이하, 각각의 로우는 릴레이션의 튜플을 나타낸다
 * relation 모든 문자열 길이는 1 이상 8 이하, 알파벳 소문자와 숫자로만 이루어져 있음
 * relation의 모든 튜플은 유일하게 식별 가능하다(중복되는 튜플 없음)
 */

export function solution(relation) {
  const numCols = relation[0].length;
  const cols = Array.from({ length: numCols }, (_, idx) => idx); // [0, 1, 2, 3]

  // 주어진 속성 인덱스의 모든 조합 생성
  // [[0], ..., [3], [0, 1], ..., [2, 3], [0, 1, 2], ..., [1, 2, 3], [0, 1, 2, 3]]
  const allCombs = cols.reduce((combs, colIdx) => {
    return combs.concat(getCombinationsIterative(cols, colIdx + 1));
  }, []);

  // [[0], [0, 1], [0, 2], ..., [0, 1, 2], [0, 1, 3] ..., [0, 1, 2, 3]]
  const uniqueCombs = [];

  // 유일성 검사: 각 조합에 대해 Set을 이용해 중복을 제거한 후, 그 크기가 relation의 row 수와 동일한지 확인
  for (const combination of allCombs) {
    const seen = new Set();
    for (const row of relation) {
      // 1자리 조합일 때 e.g. [0] : 100, 200, 300, 400, 500, 600
      // 2자리 조합일 때 e.g. [0, 1]: 100.ryan, 200.apeach, 300.tube, ...
      // 3자리 조합일 때 e.g. [0, 1, 2]: 100.ryan.music, 200.apeach.math, ...
      const key = combination.map(idx => row[idx]).join('.');
      seen.add(key);
    }
    // 중복일 경우 seen 사이즈가 relation의 row보다 작아짐
    if (seen.size === relation.length) uniqueCombs.push(combination);
  }

  const candidateKeys = [];

  // 최소성 검사: 현재 키가 이미 선택된 후보키의 부분 집합이 아닌 것만 필터
  // 최소성을 만족하려면 비교하는 두 조합(키)이 서로 겹치는 키가 없어야 하기 때문
  for (const comb of uniqueCombs) {
    // every는 빈 배열일 때 항상 true를 반환한다. 따라서 첫 번째 조합은 항상 조건을 통과한다
    const isCandidate = candidateKeys.every(key => !key.every(k => comb.includes(k)));
    if (isCandidate) candidateKeys.push(comb);
  }

  return candidateKeys.length;
}

export const cases = [
  generateTestPair(
    [
      [
        ['100', 'ryan', 'music', '2'],
        ['200', 'apeach', 'math', '2'],
        ['300', 'tube', 'computer', '3'],
        ['400', 'con', 'computer', '4'],
        ['500', 'muzi', 'music', '3'],
        ['600', 'apeach', 'music', '2'],
      ], // relation
    ],
    2, // result
  ),
  generateTestPair(
    [
      [
        ['a', '1'],
        ['a', '2'],
        ['b', '1'],
        ['b', '2'],
      ],
    ],
    1,
    '단독 행이 유일성을 가지지 않는 경우',
  ),
  generateTestPair(
    [
      [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '5', '9'],
      ], // relation
    ],
    3, // result
    '여러 속성이 유일성을 가지는 경우',
  ),
];
