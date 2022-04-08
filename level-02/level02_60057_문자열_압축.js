// noinspection SpellCheckingInspection
// 압축할 문자열 s를 매개변수로 받아(s 길이 1~1000),
// 1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중에서
// 가장 짧은 것의 길이를 반환하는 함수

function solution(s) {
  let answer = s.length;

  // 입력 받은 문자열 길이의 절반이 최대한 압축할 수 있는 수
  // i : 압축 단위
  for (let i = 1; i <= Math.floor(s.length / 2); i += 1) {
    let count = 1; // 압축 카운트
    let str = '';
    let tempStr = s.slice(0, i);
    // 압축 기준 문자(abcabcdede 기준) : a(i=1), ab(i=2), abc(i=3), abca(i=4), abcab(i=5)

    for (let j = i; j < s.length; j += i) {
      const nextStr = s.slice(j, j + i);
      // 압축 기준 문자열부터 압축 단위까지 잘라서 비교할 문자열 설정
      // i 최대값이 s 길이의 절반이므로 slice로 자른 후 문자열이 누락될일 없음
      // (abcabcdede 기준) b, c, a, b, c, d, e, d, e, ca, bc, de, de, abc, ded, e, bcde, de, cdede
      if (tempStr === nextStr) {
        count += 1; // 더 압축할 수 있으므로 카운트 + 1
      } else {
        count === 1 ? (str += tempStr) : (str += count + tempStr);
        count = 1;
        tempStr = nextStr;
      }
    }
    // 나머지 문자열 붙여주기

    count === 1 ? (str += tempStr) : (str += count + tempStr);
    answer = Math.min(answer, str.length);
  }

  return answer;
}

// 'abcabcdede'
// i = 1 : 1개 단위(압축 단위)로 잘랐을 때
// 문자열의 가장 앞에서부터 압축 단위만큼 잘라서 기준 문자열 설정 : a
// (안쪽 for문) 압축 기준 문자열부터 압축 단위까지 잘라서 비교할 문자열 설정 : b
// 기준 문자열과 비교할 문자열이 같으면 count + 1 후 다음 문자열 비교
// 기준 문자열과 비교할 문자열이 다르면 더이상 압축할 수 없으므로 count 에 따라 문자열 정리
// -> count = 1 이면 압축한게 없으므로 기준 문자열만 붙여넣기
// -> count > 1 이면 압축 횟수와 기준 문자열 붙여넣기
// 안쪽 반복문을 종료한 후 count 횟수에 따라 나머지 문자열 붙여넣기

// ... 압축 단위가 3이라고 가정 (i = 3)
// tempStr = abc
// j = 3 / nextStr = abc -> tempStr === nextStr 이므로 count + 1 = 2
// j = 6 / nextStr = ded -> tempStr !== nextStr 이므로 2abc
// count 1로 초기화, tempStr(abc) -> ded로 변경
// j = 9 / nextStr = e -> tempStr !== nextStr 이므로 2abc + ded
// 나머지 문자열 붙여서 2abcded + e

const testCase = [
  {
    input: 'aabbaccc', // length 8
    expectedResult: 7, // '2a2ba3c' (1개 단위로 잘라 압축했을 때 가장 짧음)
  },
  {
    input: 'ababcdcdababcdcd', // length 16
    expectedResult: 9, // '2ababcdcd' (8개 단위로 잘라 압축했을 때 가장 짧음)
  },
  {
    input: 'abcabcdede', // length 10
    expectedResult: 8, // '2abcdede' (3개 단위로 잘라 압축했을 때 가장 짧음)
  },
  {
    input: 'abcabcabcabcdededededede',
    expectedResult: 14,
    // 2개 단위로 잘랐을 때 : 'abcabcabcabc6de'
    // 3개 단위로 잘랐을 때 : '4abcdededededede'
    // 4개 단위로 잘랐을 때 : 'abcabcabcabc3dede'
    // 6개 단위로 잘랐을 때 : '2abcabc2dedede' -> 가장 짧음
  },
  {
    input: 'abcabcabcabcdededededede',
    expectedResult: 17,
    // 문자열은 제일 앞에서부터 정해진 길이만큼 잘라야 함. 따라서 어떻게 자르던지 압축 불가
  },
];

solution('abcabcdede');

// testCase.forEach(({ input, expectedResult }) =>
//   console.log('문자열 압축', {
//     input,
//     output: solution(input),
//     passed: solution(input) === expectedResult,
//   }),
// );
