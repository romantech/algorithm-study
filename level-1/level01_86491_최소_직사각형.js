// 모든 명함을 수납할 수 있는 가장 작은 사이즈의 명함 케이스의 가로*세로 값 리턴
// 가로, 세로 회전 가능

function solution(sizes) {
  // 최소 단위 구하기
  const maxNum = sizes.reduce(
    (acc, [a, b]) => Math.max(acc, Math.max(a, b)),
    0,
  );
  const result = [maxNum, 0];

  sizes.forEach(([s1, s2]) => {
    const minNum = Math.min(s1, s2);
    if (result[1] < minNum) {
      result[1] = minNum;
    }
  });

  return result[0] * result[1];
}

const case1 = [
  [60, 50],
  [30, 70],
  [60, 30],
  [80, 40],
]; // 4000 (80*50)

solution(case1); /* ? */
