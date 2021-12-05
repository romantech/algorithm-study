// 단어 s의 가운데 글자 반환
// 단어 길이 짝수면 가운데 두 글자 반환

function solution(s) {
  const len = s.length;
  const halfLen = len / 2;

  if (len % 2 === 0) {
    return s[halfLen - 1] + s[halfLen];
  }
  return s[Math.floor(halfLen)];
}

const c1 = 'abcde'; // c
const c2 = 'qwer'; // we

// abcdefgh
solution(c1); /* ? */
