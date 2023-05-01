// k : 명예의 전당 목록 개수 (3~100)
// score : 1일부터 마지막 날까지 출연한 가수들의 점수
// case 1 예시 (괄호친 곳이 k 개수중 최하 점수)
// 1일 : (10)
// 2일 : 100, (10)
// 3일 : 100, 20, (10)
// 4일 : 150, 100, (20)
// 5일 : 150, 100, (20)
// 6일 : 150, 100, (100)
// 7일 : 200, 150, (100)

const cases = [
  {
    input: [3, [10, 100, 20, 150, 1, 100, 200]], // [k, score]
    output: [10, 10, 10, 20, 20, 100, 100],
  },
  {
    input: [4, [0, 300, 40, 300, 20, 70, 150, 50, 500, 1000]],
    output: [0, 0, 0, 0, 20, 40, 70, 70, 150, 300],
  },
];

/* ========================================================= */

function solution(k, score) {
  const temp = [[score[0]]];

  for (let i = 1; i < score.length; i += 1) {
    const today = [...temp[i - 1], score[i]];
    today.sort((a, b) => b - a).splice(k);
    temp.push(today);
  }

  return temp.map(day => day.at(-1));
}

solution(...cases[1].input);
