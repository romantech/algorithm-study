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
