/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

import { generateTestPair } from '../../utils.js';

/**
 * 지원자는 아래 4가지 항목을 반드시 선택
 * 개발언어: cpp, java, python
 * 직군: backend, frontend
 * 경력: junior, senior
 * 소울푸드: chicken, pizza
 *
 * 지원자들의 지원 조건을 선택하면 해당 조건에 맞는 지원자가 몇 명인지 찾아야 함 예를들어...
 * {조건}을 만족하는 사람 중 코딩테스트 점수를 {숫자}점 이상 받은 사람은 모두 몇 명인가?
 * "java로 참여, backend 직군 선택, junior 경력, 소울푸드는 pizza 이고 코테 점수가 50점 이상인 사람은 몇 명인가?"
 * "코딩테스트 점수를 150점 이상 받은 사람은 모두 몇 명인가?"
 * "소울푸드로 chicken을 선택한 사람 중 코딩테스트 점수를 250점 이상 받은 사람은 모두 몇 명인가?"
 *
 * 지원자가 입력한 4가지 정보와, 코딩테스트 점수를 하나의 문자열로 구성한 값의 배열 info와,
 * 개발팀이 궁금해하는 문의조건을 문자열 형태로 담은 배열 query가 매개변수로 주어질 때,
 * 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아서 리턴
 *
 * [제한사항]
 * info 배열 크기 1 이상 50,000 이하
 * info 각 원소는 지원서에 입력한 4가지 값과 코딩테스트 점수를 합친 형식
 * 코딩 테스트 점수는 1 이상 100,000 이하 자연수
 * 각 단어는 공백문자 하나로 구분
 * query 배열 크기는 1 이상 100,000 이하
 * query의 각 문자열은 [조건] X 형식
 * '-' 표시는 해당 조건을 고려하지 않겠다는 의미
 *
 * 예를들어 "cpp and - and senior and pizza 500" 쿼리는
 * cpp로 코딩 테스트를 봤으며, 경력은 senior, 소울푸드는 pizza를 선택한 지원자 중 코딩테스트 점수를 500점 이상
 * 받은 사람은 모두 몇 명인가?를 의미
 */

const parseQuery = str => str.split(/\s+and\s+|\s(?=\d+)/);
const createKey = (arr, separator = ' ') => arr.join(separator);

const allCombinations = (arr, prefix = []) => {
  if (arr.length === 0) return [prefix];
  return arr[0].reduce((acc, v) => {
    acc.push(...allCombinations(arr.slice(1), prefix.concat(v)));
    return acc;
  }, []);
};

const bisectLt = (sortedArr, target) => {
  let low = 0;
  let high = sortedArr.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (sortedArr[mid] >= target) high = mid;
    else low = mid + 1;
  }
  return sortedArr.length - low; // target 보다 크거나 같은 요소의 개수
};

export function solution(info, query) {
  const languages = ['cpp', 'java', 'python', '-'];
  const positions = ['backend', 'frontend', '-'];
  const levels = ['junior', 'senior', '-'];
  const soulFoods = ['chicken', 'pizza', '-'];
  const allConditions = [languages, positions, levels, soulFoods];

  // ⑴ 조건에 대한 모든 조합 생성
  // [ 'cpp', 'backend', 'junior', 'chicken' ], [ 'cpp', 'backend', 'junior', 'pizza' ], ...]
  const combinations = allCombinations(allConditions);
  // { 'cpp backend junior chicken': [], 'cpp backend junior pizza': [], ... }
  const criteriaMap = new Map(combinations.map(comb => [createKey(comb), []]));

  // ⑵ 점수 데이터 매핑
  // { 'cpp backend junior chicken': [260, 110], 'cpp backend junior pizza': [], ... }
  info.forEach(entry => {
    const [lang, pos, lv, food, score] = entry.split(' ');
    combinations.forEach(comb => {
      const passed = [lang, pos, lv, food].every((c, i) => comb[i] === '-' || comb[i] === c);
      if (passed) criteriaMap.get(createKey(comb)).push(parseInt(score, 10));
    });
  });

  // 이진 탐색을 위해 각 조합의 score 오름차순 정렬
  criteriaMap.forEach(scores => scores.sort((a, b) => a - b));

  // ⑶ 이진 탐색으로 조건에 맞는 인원 검색
  return query.map(q => {
    const [language, position, level, food, score] = parseQuery(q);
    const key = createKey([language, position, level, food]);
    return bisectLt(criteriaMap.get(key), parseInt(score, 10));
  });
}

export const cases = [
  generateTestPair(
    [
      [
        'java backend junior pizza 150',
        'python frontend senior chicken 210',
        'python frontend senior chicken 150',
        'cpp backend senior pizza 260',
        'java backend junior chicken 80',
        'python backend senior chicken 50',
      ],
      [
        'java and backend and junior and pizza 100',
        'python and frontend and senior and chicken 200',
        'cpp and - and senior and pizza 250',
        '- and backend and senior and - 150',
        '- and - and - and chicken 100',
        '- and - and - and - 150',
      ], // input
    ],
    [1, 1, 1, 1, 2, 4], // output
  ),
  generateTestPair(
    [
      [
        'cpp backend junior pizza 150',
        'java backend senior chicken 210',
        'python frontend senior pizza 260',
        'java backend junior chicken 90',
        'cpp frontend senior pizza 320',
        'java backend senior pizza 50',
        'python backend junior chicken 80',
        'cpp backend junior chicken 70',
      ],
      [
        'cpp and backend and junior and pizza 100',
        'java and backend and senior and chicken 200',
        'python and frontend and senior and pizza 250',
        'java and backend and - and - 100',
        'cpp and - and - and pizza 200',
        '- and backend and senior and pizza 50',
        '- and - and - and chicken 100',
        '- and - and senior and pizza 300',
        '- and backend and - and pizza 100',
        'python and - and - and - 50',
      ],
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  ),
];

/* ------------------------------------------------------------------------
비트마스크를 활용한 레퍼런스(가독성을 위해 일부 코드 개선/수정)
* 참고하면 좋은 글: https://bit.ly/4dL6ywz
* 비트 마스크: 이진수의 각 비트를 조작하여 특정한 상태나 값을 표현하는 방법
------------------------------------------------------------------------  */
function convertToBitmaskAndScore(list, table, adjust = x => x) {
  const bitmask = list.slice(0, -1).reduce((acc, key) => {
    // 매 순회마다 3비트 확보 후(acc << 3), 1번째 글자를 table과 맵핑한 숫자 저장
    // 예를들어 순회마다 첫번째 글자가 j(5), b(6), j(5), p(6) 라면
    // acc << 3 = 0 -> 0 + 101(j)
    // acc << 3 = 101000       -> 101000 + 110(b) = 101110
    // acc << 3 = 101110000    -> 101110000 + 101(j) = 101110101
    // acc << 3 = 101110101000 -> 101110101000 + 110(p) = 101110101110 (10진수 2990)
    // 최종 결과는 101110101110이 되고(10진수 2990), 각 비트 그룹에 아래처럼 문자를 저장한 것과 동일
    // 101(j) 110(b) 101(j) 110(p)
    // 만약 비트를 확보하지 않는다면 모든 숫자가 겹쳐서 더해지므로 비트 수준에 문자를 저장할 수 없다
    // e.g., 0 + 101 + 110 + 101 + 110 = 10110(십진수 22)
    const firstLetter = key.at(0);
    return (acc << 3) + adjust(table[firstLetter]);
  }, 0);
  const score = parseInt(list.at(-1), 10);
  return [bitmask, score];
}

export function reference(info, query) {
  // 각 조건을 최대 3비트로 표현한 테이블 : 3 = 011(2), 5 = 101(2), 6 = 110(2), 0 = 000(2)
  // 각 조건의 최대값은 7 = 111(2) / 참고로 십진수 8부터 이진수는 1000이 돼서 4비트를 넘어감
  const table = { c: 3, j: 5, p: 6, b: 6, f: 5, s: 6, '-': 0 }; // c, j 등은 모든 조건의 앞 글자

  // 3비트로 변환한 info/query를 AND 연산자로 비교하기 위해 info 조건은 x => 7 - x 함수를 통해 역순으로 변환
  // 여기서 역순 변환은 각 비트 그룹의 최대값인 7을 기준으로 값을 반대로 변환하는 작업을 가리킴
  // 각 조건의 역순을 2진수로 표현하면 -> 4(7-3) = 100(2), 2(7-5) = 010(2), 1(7-6) = 001(2), 0(7-0) = 111(2)
  // 이런식으로 변환해두면 & AND 연산자(둘 다 1이면 1, 아니면 0)로 비교했을 때 0이 나오면 동일한 값으로 간주할 수 있음
  // 예를들어 3을 역순(4)으로 변환한 2진수가 100이고 3의 이진수가 011일 때 AND 비트 연산의 결과는 0이므로 동일한 값
  info = info.map(item => convertToBitmaskAndScore(item.split(' '), table, x => 7 - x)); // [[ 1105, 150 ], [ 652, 210 ], ...]
  query = query.map(item => convertToBitmaskAndScore(parseQuery(item), table)); // [[ 2990, 100 ], [ 3443, 200 ], ...]

  // Map { 1105: [ 150 ], 652: [ 210, 150 ], ... }
  const map = info.reduce((m, [bitmask, score]) => {
    if (!m.has(bitmask)) m.set(bitmask, []);
    m.get(bitmask).push(score);
    return m;
  }, new Map());

  const sortedMapEntries = [...map].map(([bitmask, scores]) => [
    bitmask,
    scores.sort((a, b) => a - b), // score 오름차순 정렬
  ]);

  return query.map(([queryBitmask, minScore]) =>
    sortedMapEntries.reduce((count, [bitmask, scores]) => {
      // 각 조건을 3비트 역순으로 표현한 bitmask와, 3비트로 표현한 queryBitmask에
      // AND 연산을 수행하여 결과가 0이면 동일한 값, 1이면 동일하지 않은 값으로 간주
      return count + (bitmask & queryBitmask ? 0 : bisectLt(scores, minScore));
    }, 0),
  );
}
