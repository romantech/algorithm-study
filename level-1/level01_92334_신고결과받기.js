/* eslint-disable camelcase */
// noinspection SpellCheckingInspection

// 신고 처리 결과를 메일로 발송하는 시스템
// 각 유저는 1번에 1명의 유저만 신고할 수 있음
// 신고 횟수 제함 없음.
// 한 유저를 여러번 신고할 수 있지만 동일 유저에 대한 신고는 1회로 처리됨
// k번 이상 신고된 유저는 게시판 이용이 정지되고, 해당 유저를 신고한 모든 유저에게 메일 발송
// 유저가 신고한 모든 내용을 취합하여 마지막에 정지 안내 메일 발송
// 각 유저별로 처리 결과 메일을 받은 횟수를 배열로 담아 return (id_list 순서대로)

function solution(id_list, report, k) {
  const list = id_list.reduce((acc, cur) => {
    acc[cur] = new Set();
    return acc;
  }, {});

  report.forEach(el => {
    const [id, target] = el.split(' ');
    list[target].add(id);
  });

  return id_list.map(id => {
    return Object.values(list).reduce((acc, cur) => {
      if ([...cur].length >= k && [...cur].includes(id)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  });
}

const case1 = {
  // 이용자 ID
  id_list: ['muzi', 'frodo', 'apeach', 'neo'],
  // 신고한 이용자의 ID
  report: [
    'muzi frodo', // muzi 유저가 frodo 신고
    'apeach frodo',
    'frodo neo',
    'muzi neo',
    'apeach muzi',
  ],
  k: 2, // 2번 이상 신고당하면 이용 정지
}; // 결과 [2, 1, 1, 0]

/* 신고 내역 정리
 * muze: frodo, neo -> 2
 * frodo: neo -> 1
 * apeach: frodo, muzi, -> 1
 * neo: 无 -> 0
 * */

const case2 = {
  id_list: ['con', 'ryan'],
  report: ['ryan con', 'ryan con', 'ryan con', 'ryan con'],
  k: 3,
}; // [0,0]

solution(case1.id_list, case1.report, case1.k);
