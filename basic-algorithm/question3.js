// 문제3. 승점 구하기, win 3점, draw 1점, lose 0점
const getGameScore = games => {
  const tenGames = games.slice(0, 10);

  const score = tenGames.reduce((result, game) => {
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

  return score > 4 ? 4 : score;
};

// 문제3. 테스트
const testCase3 = [
  {
    input: ['3:1', '4:0', '0:0'],
    expectedResult: 4,
  },
  {
    input: ['88:88', '100:101', '888:888', '0:0'],
    expectedResult: 3,
  },
  {
    input: ['0:0', '0:1', '0:1'],
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
