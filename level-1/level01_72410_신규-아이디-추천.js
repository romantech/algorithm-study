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
  const answer = '';
  return answer;
}

const test1 = {
  new_id: '...!@BaT#*..y.abcdefghijklm',
  result: 'bat.y.abcdefghi',
};
