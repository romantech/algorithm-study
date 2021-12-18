// 매개변수가 숫자로만 구성되어 있는지 확인하는 함수

function solution(s) {
  if (s.length === 4 || s.length === 6) return s.match(/\D/g) === null;
  return false;
}

const c1 = 'a234'; // false
const c2 = '1234'; // true
const c3 = '3323fad';

solution(c3); /* ? */
