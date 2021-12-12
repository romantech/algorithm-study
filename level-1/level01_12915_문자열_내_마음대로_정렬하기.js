function solution(strings, n) {
  // sort() 메서드 인자에 compare fn 명시 안하면 사전순 정렬(아스키코드 순서)
  return strings.sort((a, b) => {
    if (a[n] < b[n]) return -1;
    if (a[n] > b[n]) return 1;
    const s = [a, b].sort();
    if (s[0] === a) {
      return -1;
    }
    return 1;
  });
}

const c1 = {
  strings: ['sun', 'bed', 'car'],
  n: 1,
}; // 	["car", "bed", "sun"]

const c2 = {
  strings: ['abce', 'abcd', 'cdx'],
  n: 2,
}; // 	["abcd", "abce", "cdx"]

solution(c2.strings, c2.n); /* ? */

// 레퍼런스
function solution2(strings, n) {
  // str1.localeCompare(str2) : str1이 str2보다 큰지/작은지/같은지 확인(사전식 비교)
  // 'a'.localeCompare('b') // -1 (a(97)가 b(98)보다 작으므로 -1)
  // 'b'.localeCompare('a') // 1 (b(98)가 a(97)보다 크므로 1)
  // 'abcd'.localeCompare('abce') // -1 -> 'abcd'(97+98+99+100)가 abce(97+98+99+101)보다 작으므로
  // 마찬가지로 자바스크립트에서 문자열은 사전식 비교(유니코드 순서) 'abcd' < 'abce' // true

  return strings.sort((s1, s2) =>
    s1[n] === s2[n] ? s1.localeCompare(s2) : s1[n].localeCompare(s2[n]),
  );
}
