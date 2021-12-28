// s 단어의 짝수번째는 알파벳은 대문자, 홀수번째 알파벳은 소문자
// 단어별로 짝/홀수 인덱스 판단
// 첫번째 글자(0번째)는 짝수

function solution(s) {
  return s
    .split(' ')
    .map(word =>
      word
        .split('')
        .map((str, idx) =>
          idx % 2 === 0 ? str.toUpperCase() : str.toLowerCase(),
        )
        .join(''),
    )
    .join(' ');
}

const c1 = 'try hello world'; // "TrY HeLlO WoRlD"
solution(c1); /* ? */
