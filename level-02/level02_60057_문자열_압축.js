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
    let tempStr = s.slice(0, i); // (압축 기준 문자) a(i=1), aa(i=2), aab(i=3), aabb(i=4)

    for (let j = i; j < s.length; j += i) {
      const nextStr = s.slice(j, j + i); // 압축 기준 문자열~압축 단위까지의 문자열 a, b, b, a, c, c, c, bb, ac, ...
      console.log(nextStr);

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

// 'aabbaccc'
// 1개 단위로 잘랐을 때 (i = 1)
// 1번 문자열과 1 + count번 문자열 같은지 검사
// 같으면 count++, 다르면 count 초기화 후 문자열 앞에 count 붙이기

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
    input: 'abcabcdede',
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
