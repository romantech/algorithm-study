// 절대값이 담긴 absolutes 배열 길이 1이상 1000이하
// signs가 true면 양수, false면 음수
// signs를 적용한 숫자 합 리턴

function solution(absolutes, signs) {
  return absolutes.reduce(
    (acc, cur, idx) => acc + Number(`${signs[idx] ? '+' : '-'}${cur}`),
    0,
  );
}

solution([4, 7, 12], [true, false, true]); // 9

// * 레퍼런스
function solution2(absolutes, signs) {
  return absolutes.reduce((acc, val, i) => acc + val * (signs[i] ? 1 : -1), 0);
}
