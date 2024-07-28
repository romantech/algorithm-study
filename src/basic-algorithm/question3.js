// 문제3. 승점 구하기, win 3점, draw 1점, lose 0점
const getGameScore = (games) => {
  const tenGames = games.slice(0, 10);

  return tenGames.reduce((result, game) => {
    let [home, away] = game.split(':');
    home = Number(home);
    away = Number(away);

    if (home > away) {
      return result + 3; // win
    }
    if (home === away) {
      return result + 1; // draw
    }
    return result; // lose
  }, 0);
};

// 문제3. 테스트
const testCase3 = [
  {
    input: [
      '3:1', // 3
      '4:0', // 3
      '2:0', // 3
      '1:1', // 1
      '0:0', // 1
      '0:1',
      '0:1',
      '1:0', // 3
      '2:1', // 3
      '1:0', // 3
    ],
    expectedResult: 20,
  },
  {
    input: ['0:0', '1:1', '2:2', '3:3'],
    expectedResult: 4,
  },
  {
    input: ['0:0', '0:1'],
    expectedResult: 1,
  },
];

testCase3.forEach(({ input, expectedResult }) =>
  console.log('문제3', {
    input,
    output: getGameScore(input),
    passed: getGameScore(input) === expectedResult,
  }),
);
