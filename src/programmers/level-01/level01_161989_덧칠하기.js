// 정수 n을 받아 1부터 n까지 주어진 롤러 m으로 section을 다시 칠해야하는 최소 횟수 반환
// e.g. n = 8, m = 4, section = [2,3,6]
// [1, (2), (3), 4, 5, (6), 7, 8]
// 롤러 길이(m)은 4이므로 [(2), (3), 4, 5], [(3), 4, 5, (6)] -> 2회

const cases = [
  {
    input: [8, 4, [2, 3, 6]], // n, m, section
    output: 2,
  },
  {
    input: [5, 4, [1, 3]], // n, m, section
    output: 1,
  },
  {
    input: [4, 1, [1, 2, 3, 4]], // n, m, section
    output: 4,
  },
];

// 현재 섹션 + m(롤러)) - 1 >= 섹션 마지막 = 롤러가 커버 가능
function solution(n, m, section) {
  if (m === 1) return section.length;
  let answer = 0;
  let max = 0;

  // 2(section) > 0(max) --> max = 5 (2~5번까지 칠함)
  // 3(section) < 5(max) --> 3번 섹션은 이전에 칠함
  // 6(section) > 5(max) --> max = 9 (6~9번까지 칠함)
  section.forEach(s => {
    // max : 0 > 5 > 5
    if (s > max) {
      answer++;
      max = m + s - 1;
    }
  });

  return answer;
}

solution(...cases[0].input);

export { cases, solution };
