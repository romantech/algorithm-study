// 단어 s의 가운데 글자 반환
// 단어 길이 짝수면 가운데 두 글자 반환
function solution1(s) {
  const len = s.length;
  const halfLen = s.length / 2;

  if (len % 2 === 0) return s[halfLen - 1] + s[halfLen];
  return s[Math.floor(halfLen)];
}

const c1 = 'abcde'; // c
const c2 = 'qwer'; // we

// abcdefgh
solution1(c1); /* ? */

// 레퍼런스 참고해서 개선한 코드
function solution(s) {
  const start = Math.ceil(s.length / 2) - 1;
  const end = Math.floor(s.length / 2) + 1;
  return s.slice(start, end);
}

solution(c1); /* ? */
