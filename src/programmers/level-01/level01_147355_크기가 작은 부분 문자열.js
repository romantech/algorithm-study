// 숫자로 이루어진 문자열 t를 받아 p보다 같거나 작은 수의 조합 개수 반환
// 숫자 조합은 p의 길이와 같음

const cases = [
  {
    input: ['3141592', '271'], // [t, p]
    output: 2, // 314, (241), 415, (159), 592
  },
  {
    input: ['500220839878', '7'],
    output: 8,
  },
  {
    input: ['10203', '15'],
    output: 3,
  },
];

function solution(t, p) {
  const digit = p.length;
  let answer = 0;

  for (let i = 0; i < t.length - digit + 1; i++) {
    const current = [...t].slice(i, i + digit).join('');
    if (+current <= +p) answer++;
  }

  return answer;
}

solution(...cases[1].input);
