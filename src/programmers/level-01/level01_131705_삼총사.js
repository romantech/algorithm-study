// 주어진 숫자 3개를 더해서 0이 될 수 있는 방법의 개수 반환
// ex) [-2, 3, 0, 2, -5] : -2 + 0 + 2 (1가지), -2 + 3 + -5 (2가지)
// -2 3 0, -2 3 2, -2 3 -5
// -2 0 2 -2 0 -5
// -2 2 -5, ...

function solution(number) {
  let sum = 0;
  // length - 2 인덱스부턴 두번째 중첩 루프에서 접근할 값 없으므로 length -2 조건 추가
  // ex) [-2, 3, 0, 2, -5] | i = 3 -> 2, j = 4 -> -5, k = 5 -> undefined
  for (let i = 0; i < number.length - 2; i++) {
    // 위와 동일한 이유로 length -1 조건 추가
    // ex) [-2, 3, 0, 2, -5] | j = 4 -> -5, k = 5 -> undefined
    for (let j = i + 1; j < number.length - 1; j++) {
      for (let k = j + 1; k < number.length; k++) {
        console.log(i, number[i], number[j], number[k]);
        if (number[i] + number[j] + number[k] === 0) sum += 1;
      }
    }
  }
  return sum;
}

const cases = [
  { input: [-2, 3, 0, 2, -5], result: 2 },
  { input: [-3, -2, -1, 0, 1, 2, 3], result: 5 },
  { input: [-1, 1, -1, 1], result: 0 },
];
console.log(solution(cases[0].input)); // 2
