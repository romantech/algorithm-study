// 자연수를 뒤집은 배열 리턴
// n은 10,000,000,000이하인 자연수(양의 정수)

function solution(n) {
  return `${n}`
    .split('')
    .reverse()
    .map(el => Number(el));
}

const c1 = 12345; // [5,4,3,2,1]

solution(c1); /* ? */
