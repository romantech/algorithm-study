/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
// n 전체 학생 수
// lost 체육복을 도난당한 학생들의 번호가 담긴 배열
// reserve 여벌의 체육복을 가져온 학생들

// * 내가 푼 방식 (75점)
/* function solution(n, lost, reserve) {
  let answer = n - lost.length;

  for (let i = 0; i < lost.length; i += 1) {
    for (let j = 0; j < reserve.length; j += 1) {
      if (lost[i] === reserve[j]) {
        reserve.splice(j, 1);
        answer += 1;
      }

      if (lost[i] + 1 === reserve[j] || lost[i] - 1 === reserve[j]) {
        answer += 1;
        reserve.splice(j, 1);
        break;
      }
    }
  }

  return answer;
} */

// * 레퍼런스 100점
function lostFilter(lost, reserve, findT) {
  const filterT = { me: true, friend: false };

  return lost.filter((lostN) => {
    const existI = reserve.findIndex((reserveN) =>
      // 여분의 체육복 빌려줄 수 있으면 reserve에서 제거, lost 배열엔 추가하지 않음
      // 여분의 체육복을 빌려줄 수 없으면 reserve 배열 유지, lost 배열에 추가
      filterT[findT] ? reserveN === lostN : Math.abs(reserveN - lostN) <= 1,
    );
    if (existI === -1) return true;
    reserve.splice(existI, 1);
    // reserve 배열을 splice로 변경하면 원본 배열을 변경하므로, 다음 함수호출에도 변경된 배열 그대로 사용
  });
}

function solution(n, lost, reserve) {
  const selfLost = lostFilter(lost, reserve, 'me'); // 여분 체육복을 가져왔지만 자기 체육복을 도난당해서 빌려줄 수 없는 케이스 조회
  const realLost = lostFilter(selfLost, reserve, 'friend'); // 여분의 체육복이 있는 사람중 다른 사람에게 빌려줄 수 있는 케이스 조회

  return n - realLost.length;
}

const n = 5; // 전체 학생 수
const lost = [2, 3, 4];
const reserve = [1, 3, 5]; // 여분

solution(n, lost, reserve); /* ? */
