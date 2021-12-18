// n은 2이상 1000000이하의 자연수

function solution(n) {
  // 2는 짝수중에 유일한 소수
  // 짝수는 2로 나눠지기 때문에 검사할 필요 없음
  let result = 1;

  for (let i = 3; i <= n; i += 1) {
    if (i % 2 !== 0) {
      result += 1;
      // 소수를 판별할 때 제곱근까지만 나눠보면 된다
      for (let j = 3; j <= Math.sqrt(i); j += 2) {
        if (i % j === 0) {
          result -= 1;
          break;
        }
      }
    }
  }

  return result;
}

const c1 = 13; // 4
const c2 = 5; // 3

solution(c1); /* ? */
