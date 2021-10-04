/* cSpell:disable */
/* eslint-disable */
  // 1부터 45까지 숫자중 6개를 찍어서 맞추는 로또
  // 6개 번호 일치 1등, 5개/2등, 4개/3등, 3개/4등, 2개/5등
// 구매한 로또 lottos 배열
// 당첨 로또 win_nums 배열
// 당첨 가능한 최고 순위, 최저 순위를 담은 배열 리턴 ex) [1, 3]
/* eslint-enable */
/* eslint-disable camelcase */

function solution(lottos, win_nums) {
  const winRanking = {
    6: 1,
    5: 2,
    4: 3,
    3: 4,
    2: 5,
    1: 6,
    0: 6,
  };

  let winNum = 0;
  let zeroNum = 0;
  // 당첨 갯수
  win_nums.forEach(winEl => {
    if (lottos.includes(winEl)) {
      winNum += 1;
    }
  });

  lottos.forEach(el => {
    if (el === 0) {
      zeroNum += 1;
    }
  });

  const answer = [winRanking[winNum + zeroNum], winRanking[winNum]];
  return answer;
}

const test1 = {
  lottos: [44, 1, 0, 0, 31, 25],
  win_nums: [31, 10, 45, 1, 6, 19],
  result: [3, 5],
};

solution(test1.lottos, test1.win_nums); /* ? */
