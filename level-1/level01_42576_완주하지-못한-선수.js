/* cSpell:disable */
// participant 마라톤에 참여한 선수들의 이름이 담긴 배열
// completion 완주한 선수들의 이름이 담긴 배열
// 요구사항 : 완주하지 못한 선수의 이름 1개 return

// * 내가 푼 코드 50%
// function solution(participant, completion) {
//   participant.sort();
//   completion.sort();

//   return participant.filter(el => {
//     let failed = true;

//     for (let i = 0; i < completion.length; i += 1) {
//       if (completion[i] === el) {
//         completion.splice(i, 1);
//         failed = false;
//         break;
//       }
//     }

//     return failed;
//   })[0];
// }

// * 레퍼런스1
// function solution(participant, completion) {
//   participant.sort();
//   completion.sort();

//   for (let i = 0; i < participant.length; i += 1) {
//     if (participant[i] !== completion[i]) {
//       return participant[i];
//     }
//   }
// }

// * 레퍼런스2 (출처: http://yoonbumtae.com/?p=3578)
// eslint-disable-next-line consistent-return
function solution(participant, completion) {
  const obj = {};

  // 경기 참가자는  + 1 ex) { 'ana': 1 }
  // 참가자 명단에 이름이 중복됐다면 +1 한 번 더해서 2가 됨 { 'ana': 2 }
  for (const p of participant) {
    // obj[p]가 존재하면 obj[p] + 1, 없으면 obj[p] = 1
    obj[p] = obj[p] ? obj[p] + 1 : 1;
  }

  // 완주자 배열 순회하여 완주한 사람은 -1 ex) { 'mislav': 0 }
  for (const c of completion) {
    obj[c] -= 1;
  }

  // 완주자는 0 값을 가짐. 완주하지 못한 사람은 1이상 가짐
  // 따라서 1이상의 값을 가진 key 반환
  for (const key in obj) {
    if (obj[key] === 1) {
      return key;
    }
  }
}

const participant = ['mislav', 'stanko', 'mislav', 'ana'];
const completion = ['stanko', 'ana', 'mislav'];
solution(participant, completion);
