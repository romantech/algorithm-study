// 정수를 받아 각 자리수의 큰 수부터 정렬한 정수 리턴
function solution(n) {
  return Number(
    n
      .toString()
      .split('')
      .sort((a, b) => b - a)
      .join(''),
  );
}

const c1 = 118372; // 873211

solution(c1); /* ? */
