/* eslint-disable no-unused-vars */
// 주어진 숫자 영단어를 숫자로 대체하여 원래 숫자 반환
// 정확성 테스트 제한시간 10초

function solution(s) {
  if (Number.isNaN(Number(s)) === false) {
    return Number(s);
  }

  const numWords = [
    [0, 'zero'],
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four'],
    [5, 'five'],
    [6, 'six'],
    [7, 'seven'],
    [8, 'eight'],
    [9, 'nine'],
    [10, 'ten'],
  ];

  let answer = '';

  for (let i = 0; i < s.length; i += 1) {
    if (i > s.length) {
      break;
    }
    if (Number.isNaN(Number(s[i])) === false) {
      const word = Object.fromEntries(numWords)[s[i]];
      const matchedIdx = numWords.findIndex(el => el[1] === word);
      answer += numWords[matchedIdx][0];
    } else {
      const step1 = numWords.filter(
        el =>
          el[1][0] === s[i] &&
          el[1][el[1].length - 1] === s[i + el[1].length - 1],
      );

      if (step1.length) {
        answer += step1[0][0];
        i += step1[0][1].length - 1;
      }
    }
  }

  return Number(answer);
}

const s1 = 'one4seveneight'; // 1478
const s2 = '23four5six77'; // 234567
solution(s1);
