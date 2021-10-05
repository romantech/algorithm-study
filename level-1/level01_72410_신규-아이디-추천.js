/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* cSpell:disable */

// 아래 7단계를 거쳐 새로운 아이디 제안
// 1단계 : 대문자 -> 소문자
// 2단계 : 소문자 알파벳, 숫자, -, _, . 를 제외한 모든 문자 제거
// 3단계 : 2번 이상 반복되는 마침표는 하나의 마침표로 치환
// 4단계 : 처음이나 끝에 있는 마침표 제거
// 5단계 : 빈문자일이면 a 대입
// 6단계 : 16자 이상이면 첫 15개 문자를 제외한 나머지 문자 제거. 제거 후 마침표가 처음과 긑에 온다면 마침표 제거
// 7단계 : 길이가 2자 이하면, 문자 길이가 3이 될 때까지 마지막 문자 반복해서 붙이기

function solution(new_id) {
  if (new_id.length === 0) {
    return 'aaa';
  }

  const stepOne = new_id.toLowerCase();
  const stepTwo = stepOne.replace(/[^a-z0-9\-_.]/gi, '');
  const stepThree = stepTwo.replace(/\.{2,}/gi, '.');

  const removePeriod = str => {
    if (str[0] === '.') {
      str = str.slice(1);
    }
    if (str[str.length - 1] === '.') {
      str = str.slice(0, -1);
    }

    return str;
  };

  const stepFour = removePeriod(stepThree);
  const stepFive = stepFour === '' ? 'a' : stepFour;
  let stepSix = stepFive.slice(0, 15);
  stepSix = removePeriod(stepSix);

  const checkLength = str => {
    if (str.length < 3) {
      if (str.length === 0) {
        return 'aaa';
      }
      if (str.length === 1) {
        return str + str[0] + str[0];
      }
      return str + str[1];
    }
    return str;
  };

  return checkLength(stepSix);
}

const test1 = {
  new_id: '...!@BaT#*..y.abcdefghijklm',
  result: 'bat.y.abcdefghi',
};

solution('=.=');
