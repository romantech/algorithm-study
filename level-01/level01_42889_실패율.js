// N: 스테이지 개수
// stages: 1~200000 이하 자연수, 각 요소는 사용자가 현재 도전중인 스테이지 번호
// stages 요소가 N + 1과 같다면 마지막 스테이지까지 클리어한 사용자
// 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열 리턴
// 실패율이 같으면 작은 번호의 스테이지가 먼저 오도록
// 스테이지에 도달한 유저가 없다면 실패율은 0으로 설정
// 실패율 = 스테이지에 도달했으나 클리어하지 못한 플레이어 수 / 스테이지에 도달한 플레이어 수

function solution(N, stages) {
  // 해당 스테이지를 도전중인 유저 수 -> 현재 N 숫자와 같거나 큰
  return Array.from(Array(N).keys(), n => n + 1)
    .reduce((result, stageNum) => {
      const clear = [];
      const unclear = [];
      stages.forEach(n => {
        if (n >= stageNum) {
          clear.push(n);
          if (stageNum + 1 > n) {
            unclear.push(n);
          }
        }
      });
      const rate = unclear.length / clear.length;
      return result.concat({ stageNum, rate });
    }, [])
    .sort((a, b) => b.rate - a.rate)
    .map(e => e.stageNum);
}

const case1 = {
  N: 5,
  stages: [2, 1, 2, 6, 2, 4, 3, 3],
};

solution(case1.N, case1.stages); /* ? */
