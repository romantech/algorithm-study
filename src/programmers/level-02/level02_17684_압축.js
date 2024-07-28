import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 영문 대문자만 처리하는 LZW 압축 구현
 * 1. 길이가 1인 모든 단어를 포함하도록 사전 초기화
 * 2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w 찾기
 * 3. w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w 제거
 * 4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록
 * 5. 2단계로 돌아가서 반복
 *
 * [예시 - KAKAO]
 * 색인 번호 : 1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
 * 단어     : A,  B,  C,  D,  E,  F,  G,  H,  I,  J,  K,  L,  M,  N,  O,  P,  Q,  R,  S,  T,  U,  V,  W,  X,  Y,  Z
 * 1. 현재 입력(w): K, 다음 글자(c): A, 출력 : 11(K), 사전 추가(w+c): 27-KA
 * 2. 현재 입력(w): A, 다음 글자(c): K, 출력 : 1(A), 사전 추가(w+c): 28-AK
 * 3. 현재 입력(w): KA, 다음 글자(c): O, 출력: 27(KA), 사전 추가(w+c): 29-KAO
 * 4. 현재 입력(w): O, 다음 글자(c): 无, 출력: 15(O)
 * 결과 -> [11, 1, 27, 15]
 *
 * [예시 - TOBEORNOTTOBEORTOBEORNOT]
 * 01. 현재 입력: T, 다음 글자: O, 출력: 20, 사전 추가: 27-TO
 * 02. 현재 입력: O, 다음 글자: B, 출력: 15, 사전 추가: 28-OB
 * 03. 현재 입력: B, 다음 글자: E, 출력: 2,  사전 추가: 29-BE
 * 04. 현재 입력: E, 다음 글자: O, 출력: 5,  사전 추가: 30-EO
 * 05. 현재 입력: O, 다음 글자: R, 출력: 15, 사전 추가: 31-OR
 * 06. 현재 입력: R, 다음 글자: N, 출력: 18, 사전 추가: 32-RN
 * 07. 현재 입력: N, 다음 글자: O, 출력: 14, 사전 추가: 33-NO
 * 08. 현재 입력: O, 다음 글자: T, 출력: 15, 사전 추가: 34-OT
 * 09. 현재 입력: T, 다음 글자: T, 출력: 20, 사전 추가: 35-TT
 * 10. 현재 입력: TO, 다음 글자: B, 출력: 27, 사전 추가: 36-TOB
 * 11. 현재 입력: BE, 다음 글자: O, 출력: 29, 사전 추가: 37-BEO
 * 12. 현재 입력: OR, 다음 글자: T, 출력: 31, 사전 추가: 38-ORT
 * 13. 현재 입력: TOB, 다음 글자: E, 출력: 36, 사전 추가: 39-TOBE
 * 14. 현재 입력: EO, 다음 글자: R, 출력: 30, 사전 추가: 40-EOR
 * 15. 현재 입력: RN, 다음 글자: O, 출력: 32, 사전 추가: 41-RNO
 * 16. 현재 입력: OT, 다음 글자: 无, 출력: 34, 사전 추가: 无 (다음 글자 없으면 사전 추가 안함)
 * 결과 -> [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]
 *
 * [입력]
 * msg: 영문 대문자로만 이뤄진 문자열 msg, 1 <= msg <= 1000
 */

const getInitialDict = () => {
  const startChar = 'A'.codePointAt();
  const alphabetLength = 26;
  const dict = new Map();

  for (let i = 0; i < alphabetLength; i += 1) {
    const char = String.fromCodePoint(startChar + i);
    dict.set(char, i + 1);
  }

  return dict;
};

export function solution(msg) {
  const dict = getInitialDict();
  const result = [];

  for (let i = 0; i < msg.length; i++) {
    let w = msg[i];
    let c = msg[i + 1];

    for (let j = i + 1; j < msg.length; j++) {
      const cur = msg[j];
      if (!dict.has(w + cur)) break;

      w += cur;
      i = j; // 바깥 반복문에서 i + 1 되므로
      c = msg[j + 1];
    }

    if (c) dict.set(w + c, dict.size + 1);
    result.push(dict.get(w));
  }

  return result;
}

export const reference = (msg) => {
  const dict = getInitialDict();

  const result = [];
  let i = 0;

  while (i < msg.length) {
    let currentString = msg[i];
    let nextIndex = i + 1;

    // Find the longest string in the dictionary
    while (nextIndex < msg.length && dict.has(currentString + msg[nextIndex])) {
      currentString += msg[nextIndex];
      nextIndex++;
    }

    // Add current string's index to result
    result.push(dict.get(currentString));

    // If next character exists, add new string to dictionary
    if (nextIndex < msg.length) {
      const newString = currentString + msg[nextIndex];
      dict.set(newString, dict.size + 1);
    }

    // Move to the next character after the current string
    i = nextIndex;
  }

  return result;
};

export const cases = [
  generateTestPair(['KAKAO'], [11, 1, 27, 15]),
  generateTestPair(
    ['TOBEORNOTTOBEORTOBEORNOT'],
    [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34],
  ),
  generateTestPair(['ABABABABABABABAB'], [1, 2, 27, 29, 28, 31, 30]),
];
