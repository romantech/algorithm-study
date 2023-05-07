// wallpaper를 받아 #을 포함할 수 있는 시작점/끝점 반환
// 배열 인덱스는 x, 배열 요소의 인덱스는 y

// e.g.['.#...', '..#..', '...#.']
// [(1), (2)]
// [2, 3]
// [(3), (4)]
// 좌상 -> [1 - 1, 2 - 1] -> [0, 1]
// 우하 -> [3, 4]

// e.g. ["..........", ".....#....", "......##..", "...##.....", "....#....."]
// 상: [2, 6]
// 우: [3, 8]
// 좌: [4, 5]
// 하: [5, 5]
// 좌상 : [2 - 1, 4 - 1] -> [1, 3]
// 우하 : [5, 8]

// 상좌 : #이 있는 첫번째 배열 인덱스 + 배열 각 요소중 가장 좌측의 인덱스
// 하우 : #이 있는 마지막 배열 인덱스 + 배열 각 요소중 가장 우측의 인덱스

const cases = [
  {
    input: ['.#...', '..#..', '...#.'],
    expectedResult: [0, 1, 3, 4],
  },
  {
    input: [
      '..........',
      '.....#....',
      '......##..',
      '...##.....',
      '....#.....',
    ],
    expectedResult: [1, 3, 5, 8],
  },
  {
    input: [
      '.##...##.',
      '#..#.#..#',
      '#...#...#',
      '.#.....#.',
      '..#...#..',
      '...#.#...',
      '....#....',
    ],
    expectedResult: [0, 0, 7, 9],
  },
  {
    input: ['..', '#.'],
    expectedResult: [1, 0, 2, 1],
  },
];

function solution(wallpaper) {
  const map = {
    top: 50,
    left: 50,
    bottom: -1,
    right: -1,
  };

  for (let x = 0; x < wallpaper.length; x++) {
    wallpaper[x].split('').forEach((s, y) => {
      if (s === '#') {
        if (map.top > x) map.top = x;
        if (map.left > y) map.left = y;
        if (map.bottom < x) map.bottom = x;
        if (map.right < y) map.right = y;
      }
    });
  }

  return [map.top, map.left, map.bottom + 1, map.right + 1];
}

solution(cases[1].input);

// 레퍼런스
function solution2(wallpaper) {
  const left = [];
  const top = [];
  const right = [];
  const bottom = [];
  wallpaper.forEach((v, i) => {
    [...v].forEach((val, ind) => {
      if (val === '#') {
        left.push(i);
        top.push(ind);
        right.push(i + 1);
        bottom.push(ind + 1);
      }
    });
  });
  return [
    Math.min(...left),
    Math.min(...top),
    Math.max(...right),
    Math.max(...bottom),
  ];
}

cases.forEach(({ input, expectedResult }, i) =>
  console.log({
    index: i,
    output: solution2(input),
    passed: solution2(input).every((el, idx) => el === expectedResult[idx]),
  }),
);
