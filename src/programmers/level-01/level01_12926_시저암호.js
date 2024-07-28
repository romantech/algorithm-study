// 시저암호
// n === 1 이상 25 이하

function solution1(s, n) {
  const a = 'abcdefghijklmnopqrstuvwxyz';

  return s.split('').reduce((acc, cur) => {
    if (cur === ' ') return acc.concat(' ');
    const curIdx = a.indexOf(cur.toLowerCase());
    const isLowerCase = a[curIdx] === cur;
    const encodedStr = curIdx + n < a.length ? a[curIdx + n] : a[Math.abs(curIdx + n - a.length)];
    return acc.concat(isLowerCase ? encodedStr.toLowerCase() : encodedStr.toUpperCase());
  }, '');
}

const c1 = {
  s: 'AB',
  n: 1,
}; // 'BC'

const c2 = {
  s: 'z',
  n: 1,
}; // 'a'

const c3 = {
  s: 'a B z',
  n: 4,
}; // "e F d"
const c4 = {
  s: 'uy',
  n: 25,
}; // "tx"

solution1(c4.s, c4.n); /* ? */

// 레퍼런스(가독성 좋게 조금 변형함)
function solution2(s, n) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    ' '.repeat(26);
  return s
    .split('')
    .map((e) => chars[chars.indexOf(e) + n])
    .join('');
}

solution2(c4.s, c4.n); /* ? */
