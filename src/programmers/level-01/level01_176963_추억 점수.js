/**
 * 사진들의 추억 점수를 photo에 주어진 순서대로 배열에 담아 리턴
 * e.g. 첫번째 케이스 예시
 * ['may', 'kein', 'kain', 'radi'] -> [5, 10, 1, 3] -> 19
 * ['may', 'kein', 'brin', 'deny'] -> [5, 10, 0, 0] -> 15
 * ['kon', 'kain', 'may', 'coni'] -> [0, 1, 5, 0] -> 6
 * return [19, 15, 6]
 */

const cases = [
  {
    input: [
      ['may', 'kein', 'kain', 'radi'], // name
      [5, 10, 1, 3], // yearning
      [
        ['may', 'kein', 'kain', 'radi'],
        ['may', 'kein', 'brin', 'deny'],
        ['kon', 'kain', 'may', 'coni'],
      ], // photo
    ],
    output: [19, 15, 6],
  },
  {
    input: [
      ['kali', 'mari', 'don'], // name
      [11, 1, 55], // yearning
      [
        ['kali', 'mari', 'don'],
        ['pony', 'tom', 'teddy'],
        ['con', 'mona', 'don'],
      ], // photo
    ],
    output: [67, 0, 55],
  },
  {
    input: [
      ['may', 'kein', 'kain', 'radi'], // name
      [5, 10, 1, 3], // yearning
      [['may'], ['kein', 'deny', 'may'], ['kon', 'coni']], // photo
    ],
    output: [5, 15, 0],
  },
];

function solution(name, yearning, photo) {
  const scoreByName = name.reduce((acc, cur, i) => {
    acc[cur] = yearning[i];
    return acc;
  }, {});

  return photo.map(p => p.reduce((acc, cur) => acc + (scoreByName[cur] || 0), 0));
}

solution(...cases[0].input);
