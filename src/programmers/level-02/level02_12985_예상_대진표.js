/**
 * [요구사항]
 * N명의 참가자 1번부터 N번 차례대로 배정 받은 후 1<>2, 3<>4, ... N-1<>N번의 참가자끼리 게임 진행
 * 다음 라운드에선 다시 1번부터 N/2번 차례대로 배정
 * 1<>2 게임에서 2번이 승리하면 1번(2/2) 부여받고, 3<>4 게임에서 3번이 승리하면 (3/2) 2번 부여받음
 * 게임은 최종 한 명 남을 때까지 진행
 * 처음 A번을 가진 참가자는 경쟁자 B번 참가자와 몇 번째 라운드에서 만나는지 반환 (A,B는 항상 이긴다고 가정)
 *
 * [파라미터]
 * N: 게임 참가자수, 2^1 이상 2^20 이하 자연수
 * A: 참가자 번호 (N이하 자연수)
 * B: 경쟁자 번호 (N이하 자연수)
 *
 * [시뮬레이션]
 * N=8, A=4, B=7
 * 참가자: 1, 2, 3, 4, 5, 6, 7, 8
 * 1라운드(N8): [1, 2],[3, 4],[5, 6],[7, 8] -> 1, 4, 5, 7
 * 2라운드(N4): [1, 4],[5, 7] -> 4, 7
 * 3라운드(N2): [4, 7]
 */

function solution(n, a, b) {
  const totalRounds = Math.log2(n);

  // 라운드 수 만큼 n을 2로 나누면 해당 번호가 몇 번째 팀인지 확인 가능
  // e.g. 1라운드에선 2를 한 번 나누고, 2라운드에선 2로 두 번 나누고...
  const getGroupNumber = (p, round) => {
    let result = p;
    for (let i = round; i > 0; i--) result = Math.ceil(result / 2);
    return result;
  };

  for (let i = 1; i <= totalRounds; i += 1) {
    const groupA = getGroupNumber(a, i);
    const groupB = getGroupNumber(b, i);
    if (groupA === groupB) return i;
  }

  return -1;
}

function reference(n, a, b) {
  let answer = 0;
  let groupA = a;
  let groupB = b;

  while (groupA !== groupB) {
    groupA = Math.ceil(a / 2);
    groupB = Math.ceil(b / 2);
    answer++;
  }

  return answer;
}

const cases = [
  {
    input: [8, 4, 7], // N, A, B
    output: 3,
  },
];

console.log(solution(...cases[0].input));
