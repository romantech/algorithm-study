// 두 정수 a, b가 주어졌을 때 a,b 사이에 속한 모든 정수의 합 리턴
// a, b가 같으면 둘 중 아무수나 리턴

function solution(a, b) {
  if (a === b) return a;

  const num = Math.abs(a - b);
  let minNum = Math.min(a, b);

  let result = 0;
  for (let i = 0; i <= num; i += 1) {
    result += minNum;
    minNum++;
  }
  return result;
}

const c1 = { a: 3, b: 5 }; // 3 + 4 + 5 = 12
const c2 = { a: 3, b: 3 }; // 3
const c3 = { a: 5, b: 3 }; // 5 + 4 + 3 = 12

solution(c3.a, c3.b); /* ? */
