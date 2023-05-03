// 문자열을 받아, 각 문자와 동일한 문자열이 자신보다 몇번째 앞에 있는지 구하는 함수
// ex) banana
// b: 처음 나와서 -1
// a: 처음 나와서 -1
// n: 처음 나와서 -1
// a: 2
// n: 2
// a: 2
// [-1, -1, -1, 2, 2, 2]

const cases = [
  { input: 'banana', output: [-1, -1, -1, 2, 2, 2] },
  { input: 'foobar', output: [-1, -1, 1, -1, -1, -1] },
];

function solution(s) {
  const stringMap = new Map();
  const result = [];
  for (let i = 0; i < s.length; i++) {
    if (!stringMap.has(s[i])) result.push(-1);
    else result.push(Math.abs(stringMap.get(s[i]) - i));
    stringMap.set(s[i], i);
  }

  return result;
}

solution(cases[1].input);
