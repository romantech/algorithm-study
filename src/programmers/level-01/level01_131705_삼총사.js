// 주어진 숫자 3개를 더해서 0이 될 수 있는 방법의 개수 반환
// ex) [-2, 3, 0, 2, -5] : -2 + 0 + 2 (1가지), -2 + 3 + -5 (2가지)
// -2 3 0, -2 3 2, -2 3 -5
// -2 0 2 -2 0 -5
// -2 2 -5, ...

function solution1(number) {
  let sum = 0;
  // length - 2 인덱스부턴 두번째 중첩 루프에서 접근할 값 없으므로 length -2 조건 추가
  // ex) [-2, 3, 0, 2, -5] | i = 3 -> 2, j = 4 -> -5, k = 5 -> undefined
  for (let i = 0; i < number.length - 2; i++) {
    // 위와 동일한 이유로 length -1 조건 추가
    // ex) [-2, 3, 0, 2, -5] | j = 4 -> -5, k = 5 -> undefined
    for (let j = i + 1; j < number.length - 1; j++) {
      for (let k = j + 1; k < number.length; k++) {
        // console.log(i, number[i], number[j], number[k]);
        if (number[i] + number[j] + number[k] === 0) sum += 1;
      }
    }
  }
  return sum;
}

const cases = [
  { input: [-2, 3, 0, 2, -5], result: 2 },
  { input: [-3, -2, -1, 0, 1, 2, 3], result: 5 },
  { input: [-1, 1, -1, 1], result: 0 },
];
solution1(cases[0].input); // 2

// Reference DFS 백트래킹
// DFS : 루트 노트에서 시작해 다음 분기(branch)로 넘어가기 전 해당 분기를 완벽하게 탐색하는 방법
// Stack 혹은 재귀함수로 구현하며 모든 경로를 방문해야될 때 사용
// 백트래킹 : 모든 경우의 수 조사할 때 사용
function solution2(number) {
  let answer = 0;

  const backtrack = (current, index) => {
    console.log(`current: ${current}, index: ${index}, answer: ${answer}`);
    if (current.length === 3) {
      const sum = current.reduce((acc, curr) => acc + curr);
      if (sum === 0) answer++;
      return;
    }

    for (let i = index; i < number.length; i++) {
      backtrack([...current, number[i]], i + 1);
    }
  };

  backtrack([], 0);

  return answer;
}

solution2(cases[0].input); // 2
// Input: [-2, 3, 0, 2, -5]
// (1) B([], 0) 0번 인덱스 부터 시작
// -----B([], 0)----- 첫번째 숫자
// (2) Loop i = 0 : B0([-2], 1)
// (12) Loop i = 1 : B0([3], 2)
// (18) Loop i = 2 : B0([0], 3)
// (22) Loop i = 3 : B0([2], 4)
// (24) Loop i = 4 : B0([-5], 5) -> x

// -----B0([-2], 1)----- 두번째 숫자
// (3) Loop i = 1 : B1([-2, 3], 2)
// (7) Loop i = 2 : B1([-2, 0], 3)
// (10) Loop i = 3 : B1([-2, 2], 4)
// (11) Loop i = 4 : B1([-2, -5], 5) -> x
// -----B1([-2, 3], 2)----- 세번째 숫자
// (4) Loop i = 2 : B2([-2, 3, 0], 3) -> x
// (5) Loop i = 3 : B2([-2, 3, 2], 4) -> x
// (6) Loop i = 4 : B2([-2, 3, -5], 5) -> x
// -----B1([-2, 0], 3)----- 세번째 숫자
// (8) Loop i = 3 : B2([-2, 0, 2], 4) -> +1
// (9) Loop i = 4 : B2([-2, 0, -5], 5) -> x
// -----B1([-2, 2], 4)----- 세번째 숫자
// (11) Loop i = 4 : B2([-2, 2, -5], 5) -> x

// -----B0([3], 2)----- 두번째 숫자
// (13) Loop i = 2 : B1([3, 0], 3)
// (16) Loop i = 3 : B1([3, 2], 4)
// (17) Loop i = 4 : B1([3, -5], 5) -> x
// -----B1([3, 0], 3)----- 세번째 숫자
// (14) Loop i = 3 : B2([3, 0, 2], 4) -> x
// (15) Loop i = 4 : B2([3, 0, -4], 5) -> x
// -----B1([3, 2], 4) ----- 세번째 숫자
// (17) Loop i = 4 : B2([3, 2, -5], 5) -> +1
// -----B0([0], 3)----- 두번째 숫자
// (19) Loop i = 3 : B1([0, 2], 4)
// (21) Loop i = 4 : B1([0, -5], 5) -> x
// -----B1([0, 2], 4) ----- 세번재 숫자
// (20) Loop i = 4 : B2([0, 2, -5], 5) -> x

// -----B0([2], 4) ----- 두번째 숫자
// (23) Loop i = 4 : B1([2, -5], 5) -> x
