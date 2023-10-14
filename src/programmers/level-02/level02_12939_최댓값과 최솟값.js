// 문자열 s에 있는 최대값 최소값 반환

function solution(s) {
  const arr = s.split(' ');
  arr.sort((a, b) => a - b);
  const [min, max] = [arr[0], arr[arr.length - 1]];
  return `${min} ${max}`;
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

console.log(solution(cases[2].input));
