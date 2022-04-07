/* eslint-disable no-param-reassign */
/**
 * 다른 진법으로 변환 value.toString(진수)
 * 다른 진법을 10진법으로 변환 Number.parseInt(value, value의 진수)
 */

// 3진법 변환
// 앞뒤 반전
// 다시 10진법 변환

function solution1(n) {
  const r = n.toString(3).split('').reverse().join('');
  return Number.parseInt(r, 3);
  // return parseInt([...n.toString(3)].reverse().join(""), 3);
  // [...'0021'] -> ['0', '0', '2', '1']
}

// * 레퍼런스(진법변환 메소드 미사용)

function solution2(n) {
  const answer = [];
  while (n !== 0) {
    answer.unshift(n % 3); // [0], [0, 0], [2, 0, 0], [1, 2, 0, 0]
    n = Math.floor(n / 3);
  }
  return answer.reduce((acc, v, i) => acc + v * 3 ** i, 0);
}

const case1 = 45; // 7
const case2 = 125; // 229

solution2(case1); /* ? */
