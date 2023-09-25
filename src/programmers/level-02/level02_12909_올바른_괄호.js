// 괄호가 올바르게 닫혔는지 판별하는 함수
// e.g. "(())()" -> true
// e.g. ")()(" -> false

function solution(s) {
  if (s[0] === ')') return false;

  let balance = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') balance++;
    else balance--;

    // ')'가 '(' 보다 많으면 false e.g. "())"
    if (balance < 0) return false;
  }

  return balance === 0;
}

const cases = [
  {
    input: '()()',
    output: true,
  },
  {
    input: '(())()',
    output: true,
  },
  {
    input: ')()(',
    output: false,
  },
  {
    input: '(()(',
    output: false,
  },
  {
    input: '())',
    output: false,
  },
];

console.log(solution(cases[3].input));

export { solution, cases };
