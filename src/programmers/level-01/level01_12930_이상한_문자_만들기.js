// s 단어의 짝수번째는 알파벳은 대문자, 홀수번째 알파벳은 소문자
// 단어별로 짝/홀수 인덱스 판단
// 첫번째 글자(0번째)는 짝수

function solution(s) {
  return s
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((str, idx) => (idx % 2 === 0 ? str.toUpperCase() : str.toLowerCase()))
        .join(''),
    )
    .join(' ');
}

const c1 = 'try hello world'; // "TrY HeLlO WoRlD"
solution(c1); /* ? */

// 레퍼런스
function toWeirdCase(s) {
  return s.toUpperCase().replace(/(\w)(\w)/g, function (a) {
    return a[0].toUpperCase() + a[1].toLowerCase();
  });

  // 'TRY HELLO WORLD'.match(/(\w\)(w/)g) -> 'TR', 'HE', 'LL', 'WO', 'RL'
  // \w는 단어문자(대소문자a~z, 0~9, _)만 매칭됨
  // \w\w 두번이므로 단어문자가 2번 연속으로 와야 매칭됨
  // 'TR' -> 단어 문자 두 번 연속이므로 매칭
  // 'Y ' -> 단어 문자와 공백이 있으므로 매칭되지 않음
  // 따라서 'TR', 'HE', 'LL', 'WO', 'RL' 이 매칭됨
  // 단어 2개씩 매칭하므로, 매칭되지 않은 문자열은 2번, 4번... 인덱스이므로 항상 대문자
  // 이 때문에 toUpperCase로 대문자로 만든 후 2개 단어문자씩 끊어서 매칭하도록 한 것
}

toWeirdCase(c1); /* ? */
