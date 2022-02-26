/* eslint-disable no-param-reassign */
// 수가 짝수면 2로 나누고 홀수면 3 곱한 후 1 더하기
// 같은 작업을 1이 될때까지 반복
// 위 작업을 몇번 반복해야지 1이 나오는지 반환하는 함수 작성
// 500번 반복해도 1이 나오지 않는다면 -1 반환

function solution(num) {
  if (num === 1) {
    return 0;
  }
  for (let i = 1; i <= 500; i += 1) {
    if (num % 2 === 0) {
      num /= 2;
    } else if (num % 2 !== 0) {
      num = num * 3 + 1;
    }
    if (num === 1) return i;
  }

  return -1;
}

const case1 = {
  n: 6,
  result: 8, // 6 > 3 > 10 > 5 > 16 > 8 > 4 > 2 > 1
};

const case2 = {
  n: 16,
  result: 4,
};

const case3 = {
  n: 626331,
  result: -1,
};

console.log(solution(case3.n));
solution(case1.n);
