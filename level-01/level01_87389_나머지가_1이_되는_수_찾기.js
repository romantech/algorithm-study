/* eslint-disable no-param-reassign */
// 나머지가 1이 되도록 하는 가장 작은 자연수(양의 정수) 수 리턴
// 3 <= n <= 1000000

function solution(n) {
  let result = n;
  for (let i = 1; i < n; i += 1) {
    if (n % i === 1) {
      if (i < result) {
        result = i;
      }
    }
  }
  return result;
}

// * 레퍼런스

function solution2(n) {
  let x = 1;
  while (x++) {
    if (n % x === 1) {
      return x;
    }
  }
}

const case1 = 10; // 3
const case2 = 12; // 11
solution2(case2); /* ? */
