// p개수와 y개수 같으면 true, 다르면 false 반환
// 대소문자 구분하지 않음

function solution(s) {
  const result = s
    .toUpperCase()
    .split('')
    .reduce((acc, cur) => {
      if (cur === 'P' || cur === 'Y') {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }
      return acc;
    }, {});

  return result.P === result.Y;
}

const c1 = 'pPoooyY'; // true
const c2 = 'Pyy'; // false

solution(c1); /* ? */
