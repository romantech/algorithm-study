// 주어진 숫자 3개를 더해서 0이 될 수 있는 방법의 개수 반환
// ex) [-2, 3, 0, 2, -5] : -2 + 0 + 2 (1가지), -2 + 3 + -5 (2가지)
// -2 3 0, -2 3 2, -2 3 -5
// -2 0 2 -2 0 -5
// -2 2 -5

function solution(number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    for (let j = i + 1; j < number.length; j++) {
      for (let k = j + 1; k < number.length; k++) {
        console.log(number[i], number[j], number[k]);
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
