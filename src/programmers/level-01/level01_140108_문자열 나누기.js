// 문자열을 받아 왼쪽부터 x와 x가 글자가 아닌 횟수 y를 세고
// 두 횟수가 같아지는 순간 멈춰서 문자열 분리.
// 분리한 문자열 빼고 남은 문자열에 위 과정 반복해서 분리한 문자열 개수 반환
// ex) banana -> initial x = b
// b(x1), a(y1) -> ba
// n(x1), a(y1) -> na
// n(x1), a(y1) -> na

// abracadabra -> initial x = a
// a(x1), b(y1) -> ab
// r(x1), a(y1) -> ra
// c(x1), a(y1) -> ca
// d(x1), a(y1) -> da
// b(x1), r(y1) -> br, a

const cases = [
  { input: 'banana', output: 3 },
  { input: 'abracadabra', output: 6 },
  { input: 'aaabbaccccabba', output: 3 },
];

function solution(s) {
  let x = null;
  let xCount = 0;
  let yCount = 0;
  let startIndex = null;
  let endIndex = null;
  const result = [];

  for (let i = 0; i < s.length; i++) {
    if (!x) {
      x = s[i];
      xCount++;
      startIndex = i;
    } else if (x === s[i]) {
      xCount++;
    } else {
      yCount++;
    }

    if (xCount === yCount) {
      result.push(s.slice(startIndex, i + 1));
      x = null;
      xCount = 0;
      yCount = 0;
      startIndex = null;
      endIndex = i;
    }
  }

  const rest = s.slice(endIndex + 1);
  if (rest) result.push(rest);

  return result.length || 1;
}

solution(cases[3].input);

/* ====================== 레퍼런스 ====================== */
function solution2(s) {
  let answer = 0;
  let current;
  let count = 0;

  // 첫번째를 제외하고 count가 0이 되면 다음 current 문자열로 변경
  // ex) (aaabbacc)(ccab)(ba) -> aaabbacc 까지 count 변화:  1 > 2 > 3 > 2 > 1 > 2 > 1 > 0
  for (let i = 0; i < s.length; i++) {
    if (count === 0) {
      answer++;
      current = s[i];
      count = 1;
    } else if (current !== s[i]) count--;
    else count++;
  }

  return answer;
}

solution2(cases[1].input);
