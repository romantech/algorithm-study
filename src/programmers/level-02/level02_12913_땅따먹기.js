// 각 행의 가장 높은 숫자의 합 반환
// land 입력값 : 행 개수 <= 100,000, 열 개수 4로 이루어진 2차원 배열
// 조건: 같은 열을 연속해서 선택할 수 없음
// 두번째 행부터 각 열을 선택했을 때 얻을 수 있는 최대 점수 저장(현재 열을 제외한 이전 행의 최대값)
// 이 과정을 반복하면 마지막 행에서 최대 점수를 얻을 수 있음

function solution(land) {
  const row = land.length;
  const column = land[0].length;

  // DP 배열 초기화 O(4n) -> 최고 차수의 항만 표시하므로 O(n)
  const dp = Array.from({ length: row }, () => Array(column).fill(0));
  [dp[0]] = land;

  // 하드 코딩 버전
  // for (let i = 1; i < row; i++) {
  //   // 현재 행의 첫번째 위치를 선택했을 때 얻을 수 있는 최대 점수 저장
  //   dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][2], dp[i - 1][3]) + land[i][0];
  //   // 현재 행의 두번째 위치를 선택했을 때 얻을 수 있는 최대 점수 저장
  //   dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][2], dp[i - 1][3]) + land[i][1];
  //   // 현재 행의 세번째 위치를 선택했을 때 얻을 수 있는 최대 점수 저장
  //   dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][3]) + land[i][2];
  //   // 현재 행의 네번째 위치를 선택했을 때 얻을 수 있는 최대 점수 저장
  //   dp[i][3] = Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]) + land[i][3];
  // }

  // 열의 개수는 항상 4이므로 이중 for문의 시간 복잡도는 O(4n) -> O(n)
  for (let i = 1; i < row; i++) {
    for (let j = 0; j < column; j++) {
      const prevRow = dp[i - 1].filter((_, index) => index !== j); // O(4) -> 상수항 무시하므로 O(1)
      const prevRowMax = Math.max(...prevRow);
      dp[i][j] = prevRowMax + land[i][j];
    }
  }

  return Math.max(...dp.at(-1));
  // solution 함수의 시간 복잡도 : DP 배열 초기화 O(n) + 이중 for문 O(n)
  // 가장 큰 차수만 표시하므로 전체 함수의 시간 복잡도 : O(n)
}

/*
land
[1, 1, 3, 1]
[2, 3, 2, 2]
[1, 4, 1, 1]

dp
[1, 1, 3, 1]
[0, 0, 0, 0] -> [5, 6, 3, 5] -> [현재 행의 첫번째 위치를 선택했을 때 가장 큰 값, 현재 행의 두번째 위치를 선택했을 때 가장 큰 값, ...]
[0, 0, 0, 0] -> [7, 9, 7, 7]

두번째 행 첫번째 요소 : Math.max(1, 3, 1) + 2 = 5
두번째 행 두번째 요소 : Math.max(1, 3, 1) + 3 = 6
두번째 행 세번째 요소 : Math.max(1, 1, 1) + 2 = 3
두번째 행 네번째 요소 : Math.max(1, 1, 3) + 2 = 5

세번째 행 첫번째 요소 : Math.max(6, 3, 5) + 1 = 7
...생략
*/

const cases = [
  {
    input: [
      [1, 2, 3, 5],
      [5, 6, 7, 8],
      [4, 3, 2, 1],
    ],
    output: 16,
  },
  {
    input: [
      [1, 1, 3, 1],
      [2, 3, 2, 2],
      [1, 4, 1, 1],
    ],
    output: 9,
  },
];

console.log(solution(cases[0].input));
