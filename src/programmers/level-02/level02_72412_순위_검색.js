import { generateTestPair } from '../../utils.js';

/**
 * 지원자는 아래 4가지 항목을 반드시 선택
 * 개발언어: cpp, java, python
 * 직군: backend, frontend
 * 경력: junior, senior
 * 소울푸드: chicken, pizza
 *
 * 지원자들의 지원 조건을 선택하면 해당 조건에 맞는 지원자가 몇 명인지 찾아야 함 예를들어...
 * {조건}을 만족하는 사람 중 코딩테스트 점수를 {숫자}점 이상 받은 사람은 모두 몇 명인가?
 * "java로 참여, backend 직군 선택, junior 경력, 소울푸드는 pizza 이고 코테 점수가 50점 이상인 사람은 몇 명인가?"
 * "코딩테스트 점수를 150점 이상 받은 사람은 모두 몇 명인가?"
 * "소울푸드로 chicken을 선택한 사람 중 코딩테스트 점수를 250점 이상 받은 사람은 모두 몇 명인가?"
 *
 * 지원자가 입력한 4가지 정보와, 코딩테스트 점수를 하나의 문자열로 구성한 값의 배열 info와,
 * 개발팀이 궁금해하는 문의조건을 문자열 형태로 담은 배열 query가 매개변수로 주어질 때,
 * 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아서 리턴
 *
 * [제한사항]
 * info 배열 크기 1 이상 50,000 이하
 * info 각 원소는 지원서에 입력한 4가지 값과 코딩테스트 점수를 합친 형식
 * 코딩 테스트 점수는 1 이상 100,000 이하 자연수
 * 각 단어는 공백문자 하나로 구분
 * query 배열 크기는 1 이상 100,000 이하
 * query의 각 문자열은 [조건] X 형식
 * '-' 표시는 해당 조건을 고려하지 않겠다는 의미
 *
 * 예를들어 "cpp and - and senior and pizza 500" 쿼리는
 * cpp로 코딩 테스트를 봤으며, 경력은 senior, 소울푸드는 pizza를 선택한 지원자 중 코딩테스트 점수를 500점 이상
 * 받은 사람은 모두 몇 명인가?를 의미
 */

function solution(info, query) {
  const answer = [];
  return answer;
}

const cases = [
  generateTestPair(
    [
      [
        'java backend junior pizza 150',
        'python frontend senior chicken 210',
        'python frontend senior chicken 150',
        'cpp backend senior pizza 260',
        'java backend junior chicken 80',
        'python backend senior chicken 50',
      ],
      [
        'java and backend and junior and pizza 100',
        'python and frontend and senior and chicken 200',
        'cpp and - and senior and pizza 250',
        '- and backend and senior and - 150',
        '- and - and - and chicken 100',
        '- and - and - and - 150',
      ],
    ],
    [1, 1, 1, 1, 2, 4],
  ),
];
