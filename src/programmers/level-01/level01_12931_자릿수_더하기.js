// 각 자릿수 합

function solution(n) {
  return `${n}`.split('').reduce((acc, cur) => acc + Number(cur), 0);
}

const c1 = 123; // 6
const c2 = 987; // 24

solution(c2); /* ? */
