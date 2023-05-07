// targets에 주어진 각 문자열에 대응하는 keymap 인덱스의 합 반환
// targets에 주어진 문자열이 keymap에 없다면 -1 반환
const cases = [
  {
    input: [
      ['ABACD', 'BCEFD'], // keymap
      ['ABCD', 'AABB'], // targets
    ],
    expectedResult: [9, 4],
  },
  {
    input: [
      ['AA'], // keymap
      ['B'], // targets
    ],
    expectedResult: [-1],
  },
  {
    input: [
      ['AGZ', 'BSSS'], // keymap
      ['ASA', 'BGZ'], // targets
    ],
    expectedResult: [4, 6],
  },
  {
    input: [
      ['FFF', 'FFF'], // keymap
      ['CCC', 'CCC'], // targets
    ],
    expectedResult: [-1, -1],
  },
  {
    input: [
      ['ABCDE', 'ABBCE'], // keymap
      ['ABBEF'], // targets
    ],
    expectedResult: [-1],
  },
];

function solution(keymap, targets) {
  const keyMapIndex = keymap.reduce((acc, cur) => {
    cur.split('').forEach((s, i) => {
      if (acc[s] > i + 1 || !acc[s]) acc[s] = i + 1;
    });
    return acc;
  }, {});

  return targets.map(target => {
    let sum = 0;
    for (const s of target.split('')) {
      if (!keyMapIndex[s]) {
        sum = -1;
        break;
      }
      sum += keyMapIndex[s];
    }
    return sum;
    /*
      keyMapIndex[cur] === undefined 일 땐 더이상 순회할 필요 없이 -1 반환하면 됨
      reduce를 사용할 수도 있지만 target을 모두 순회해야하는 단점 존재
      const sum = target
        .split('')
        .reduce((acc, cur) => acc + keyMapIndex[cur], 0); // 숫자 + undefined = NaN (falsy)
      return sum || -1;
    */
  });
}

solution(...cases[3].input);

export { cases, solution };
