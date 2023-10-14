// 문자열 s에 있는 최대값 최소값 반환

function solution(s) {
  const arr = s.split(' ');
  arr.sort((a, b) => a - b);
  const [min, max] = [arr[0], arr[arr.length - 1]];
  return `${min} ${max}`;
}

function reference(s) {
  const arr = s.split(' ');
  // Math.max|min 인자로 문자열을 전달하면, 숫자로 변환해서 작업
  // e.g. Math.max(1, 2, '-1', '10') -> 10
  return Math.min(...arr) + ' ' + Math.max(...arr);
}

const cases = [
  {
    input: '1 2 3 4',
    output: '1 4',
  },
  {
    input: '-1 -2 -3 -4',
    output: '-4 -1',
  },
  {
    input: '-1 -1',
    output: '-1 -1',
  },
];

cases.forEach(({ input, output }) => {
  console.log(solution(input) === output);
  console.log(reference(input) === output);
});
