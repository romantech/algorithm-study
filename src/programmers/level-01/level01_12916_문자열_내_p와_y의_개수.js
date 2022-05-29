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

// 레퍼런스 1
function numPY1(s) {
  return (
    s.toUpperCase().split('P').length === s.toUpperCase().split('Y').length
    // 'PPOOOYY'를 대문자로 바꾼후 각각 split('P'), split('P')하면
    // ['', '', 'OOOYY'], ['PPOOO', '', '']
    // P혹은 Y는 빈문자열로 나오고 나머진 모두 한개 문자열('YY'등)로 나오므로
    // split 후 length가 같다면 P와 Y의 개수도 같음
  );
}

// 레퍼런스 2
function numPY2(s) {
  return s.match(/p/gi).length === s.match(/y/gi).length;
  // i 플래그는 대소문자 구분 없음
  // 'pPoooyY'.match(/p/gi) -> ['p', 'P']
  // 'pPoooyY'.match(/y/gi) -> ['y', 'Y']
}
