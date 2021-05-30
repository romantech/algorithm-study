// participant 마라톤에 참여한 선수들의 이름이 담긴 배열
// completion 완주한 선수들의 이름이 담긴 배열
// 요구사항 : 완주하지 못한 선수의 이름 1개 return

function solution(participant, completion) {
  participant.sort();
  completion.sort();

  for (let i = 0; i < participant.length; i += 1) {
    if (participant[i] !== completion[i]) {
      return participant[i];
    }
  }
}

const participant = ['mislav', 'stanko', 'mislav', 'ana'];
const completion = ['stanko', 'ana', 'mislav'];
solution(participant, completion);
