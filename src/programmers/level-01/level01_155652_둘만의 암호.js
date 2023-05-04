// s의 각 알파벳을 index 만큼 뒤에 알파벳으로 변경
// index 만큼 뒤 알파벳이 z를 넘어가면 다시 a부터 시작
// skip에 있는 알파벳은 제외
// ex) s: aukks, skim: wbqd, skip: 5
// (1) a에서 5번 뒤에 있는 알파벳은 abcde(f) -> f지만
// skip에 있는 알파벳은 포함하지 않아야 하므로 b, d 제외 -> a[b]c[d]efg(h) -> h
// u에서 5번 뒤에 있는 알파벳은 uvwxy(z) -> z지만 w 제외 -> uv[w]xyz(a) -> a

const cases = [
  { input: ['aukks', 'wbqd', 5], output: 'happy' }, // s, skip, index
  { input: ['zzzzz', 'a', 1], output: 'bbbbb' },
  { input: ['z', 'abcdefghij', 20], output: 'n' },
];

// 마지막 인덱스 + skip이 알파벳 길이를 넘는다면 알파벳.length 나눈 후 나머지 값을 인덱스로 사용
// ex) 28(마지막 인덱스+skip) % 26(알파벳 길이) -> 2
// ex) 24(마지막 인덱스+skip) % 26(알파벳 길이) -> 24 (피제수가 제수보다 작으므로 피제수 그대로 반환)
function solution(s, skip, index) {
  const answer = [];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const getOffset = i => i % alphabet.length;
  const checkIncludes = idx => skip.includes(alphabet[idx]);

  for (let i = 0; i < s.length; i++) {
    let count = index;
    let idx = alphabet.indexOf(s[i]) + 1;
    while (count >= 0) {
      const offsetIdx = getOffset(idx);
      if (!checkIncludes(offsetIdx)) {
        count--;
        if (count === 0) answer.push(alphabet[offsetIdx]);
      }
      idx++;
    }
  }

  return answer.join('');
}

solution(...cases[2].input);
