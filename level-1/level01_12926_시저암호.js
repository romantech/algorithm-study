// 시저암호
// n === 1 이상 25 이하

function solution(s, n) {
  const a = 'abcdefghijklmnopqrstuvwxyz';

  return s.split('').reduce((acc, cur) => {
    if (cur === ' ') return acc.concat(' ');
    const curIdx = a.indexOf(cur.toLowerCase());
    const isLowerCase = a[curIdx] === cur;
    const encodedStr =
      curIdx + n <= 25 ? a[curIdx + n] : a[Math.abs(curIdx + n - 25 - 1)];
    return acc.concat(
      isLowerCase ? encodedStr.toLowerCase() : encodedStr.toUpperCase(),
    );
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

solution(c3.s, c3.n); /* ? */
