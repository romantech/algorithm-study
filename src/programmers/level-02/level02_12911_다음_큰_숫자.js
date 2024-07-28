// 자연수 n이 주어졌을 때 n보다 큰 자연수 계산
// 조건은 2진수로 변환했을 때 1의 개수가 같아야 함

const getLen = (n) => n.toString(2).match(/1/g).length;

function solution(n) {
  let num = n;
  let found = false;
  const len = getLen(n);

  while (!found) {
    if (getLen(++num) === len) found = true;
  }

  return num;
}

const cases = [
  {
    input: 78, // 1001110
    output: 83, // 1010011
  },
  {
    input: 15, // 1111
    output: 23, // 10111
  },
];

console.log(solution(cases[0].input));
