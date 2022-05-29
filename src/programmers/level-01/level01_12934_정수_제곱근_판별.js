// n이 어떤 양의 정수 x의 제곱인지 구하는 함수
// n이 양의 정수 x의 제곱이면 (x + 1)² 리턴
// n이 양의 정수 x의 제곱이 아니라면 -1리턴

function solution(n) {
  const root = Math.sqrt(n);
  if (n % root === 0) {
    return (root + 1) ** 2;
  }
  return -1;
}

const c1 = 121; // 144
const c2 = 3; // -1

solution(c1); /* ? */
