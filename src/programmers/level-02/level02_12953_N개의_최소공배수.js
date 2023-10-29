/**
 * n개의 숫자를 담은 배열 arr을 받아 이 수들의 최소공배수 반환
 * 최소공배수는 입력된 두 수의 배수(n이 14라면 14*1, 14*2, ...) 중 공통이 되는 가장 작은 숫자
 * e.g. [2, 7] -> 14
 * arr은 길이 1이상, 15이하
 * arr 요소는 100 이하 자연수
 */

function solution(arr) {
  const desc = arr.sort((a, b) => b - a);
  const [biggest, ...rest] = desc;

  const checker = target => rest.every(n => target % n === 0);

  let found = false;
  let i = 1;
  let result = -1;

  while (!found) {
    const num = biggest * i;
    found = checker(num);
    if (found) result = num;
    i++;
  }

  return result;
}

const cases = [
  {
    input: [2, 6, 8, 14],
    output: 168,
  },
  {
    input: [1, 2, 3],
    output: 6,
  },
];

console.log(solution(cases[1].input));
