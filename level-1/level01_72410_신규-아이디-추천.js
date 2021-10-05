/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* cSpell:disable */

// * 아래 7단계를 거쳐 새로운 아이디 제안
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
  const stepTwo = stepOne.replace(/[^a-z0-9\-_.]/g, '');
  // .replace(/[^\w-.]/g, '')
  // \w는 [0-9a-zA-Z_]과 동일
  // g 플래그를 붙이면 패턴과 일치하는 모든 것을 찾는다
  const stepThree = stepTwo.replace(/\.{2,}/g, '.');
  // .replace(/\.+/g, '.')
  // 특수문자를 그대로 검색하고 싶을 땐 백슬레시로 이스케이프 \.
  // 1번 이상 일치하는걸 찾을 땐 + 사용

  const removePeriod = str => {
    if (str[0] === '.') {
      str = str.slice(1);
    }
    if (str[str.length - 1] === '.') {
      str = str.slice(0, -1);
    }

    return str;
  };
  // .replace(/^\.|\.$/g, '')
  // 해당 정규식이 줄의 시작 부분인지 확인하는 패턴 시작 앵커 ^
  // 해당 정규식이 줄의 마지막 부분인지 확인하는 패턴 종료 앵커 $

  const stepFour = removePeriod(stepThree);
  const stepFive = stepFour === '' ? 'a' : stepFour; // .replace(/^$/, 'a')
  const stepSix = removePeriod(stepFive.slice(0, 15));

  const checkLength = str => {
    if (str.length < 3) {
      // 'aa' + 'a'
      return str + str[str.length - 1].repeat(3 - str.length);
    }
    return str;
  };

  return checkLength(stepSix);
}

solution('=.=');

// 레퍼런스
function solution2(new_id) {
  const answer = new_id
    .toLowerCase() // 1
    .replace(/[^\w-.]/g, '') // 2 (숫자, 알파벳, 언더스코어(_), 대시(-), 온점(.)이 아니면 모두 삭제)
    .replace(/\.+/g, '.') // 3 (. 온점이 1번 이상 반복되면 . 온점 하나로 대입)
    .replace(/^\.|\.$/g, '') // 4 (문자열 첫번째와 마지막이 . 온점이라면 삭제)
    .replace(/^$/, 'a') // 5 (빈문자열이면 'a' 대입)
    .slice(0, 15) // (15자를 넘어가는 문자는 제거)
    .replace(/\.$/, ''); // 6 (문자열 마지막이 . 온점이면 삭제)
  const len = answer.length;
  return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}
