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
  const reportList = id_list.reduce((acc, cur) => {
    acc[cur] = new Set();
    return acc;
  }, {});

  report.forEach((ticket) => {
    const [id, target] = ticket.split(' ');
    reportList[target].add(id);
  });

  return id_list.map((id) =>
    Object.values(reportList).reduce(
      (result, list) => (list.size >= k && list.has(id) ? result + 1 : result),
      0,
    ),
  );
}

// 레퍼런스
function solution2(id_list, report, k) {
  const reports = [...new Set(report)].map((a) => {
    return a.split(' ');
  });
  // 중복 신고 제거 ['ryan con', 'ryan con', 'ryan con', 'ryan con'] -> [['ryan', 'con']]
  // [[ 'muzi', 'frodo' ], [ 'apeach', 'frodo' ], [ 'frodo', 'neo' ], [ 'muzi', 'neo' ], [ 'apeach', 'muzi' ]]

  const counts = new Map(); // 신고된 ID
  for (const bad of reports) {
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
  }
  // 신고를 받은 ID와 해당 ID의 신고 받은 횟수
  // Map { 'frodo' => 2, 'neo' => 2, 'muzi' => 1 }

  const good = new Map(); // 신고자 ID
  // eslint-disable-next-line no-shadow
  for (const report of reports) {
    if (counts.get(report[1]) >= k) {
      // k번 이상 신고를 받은 ID를 신고했던 (신고자)ID 횟수 (안내 메일 발송 횟수)
      // Map { 'muzi' => 2, 'apeach' => 1, 'frodo' => 1 }
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }

  return id_list.map((a) => good.get(a) || 0);
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
solution2(case2.id_list, case2.report, case2.k);
