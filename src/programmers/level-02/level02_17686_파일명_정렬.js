import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 현재 사전식으로 내림차순 정렬된 상태 e.g. "12", "10", "2", "1" -> "1", "10", "12", "2"
 * 사전 순이 아닌 실제 숫자 크기가 반영되도록 하고 싶어함 "1" -> "2" -> "10" -> "12"
 * 파일명은 영문자로 시작하며, 100 글자 이내, 영문 대소문자, 숫자, 공백, 마침표, 빼기 부호로 이루어져 있음
 * 파일명은 HEAD, NUMBER, TAIL 3 부분으로 구성
 * HEAD: 숫자가 아닌 문자, 최소 1글자
 * NUMBER: 1~5 사이의 연속된 숫자로 이루어짐 e.g. 00000, 0101
 * TAIL: 나머지 부분, 글자가 없을 수도 있음
 *
 * foo9.txt: foo 9 .txt
 * foo010bar020.zip: foo 010 bar020.zip
 * F-15: F- 15 빈문자열
 *
 * 파일명을 HEAD, NUMBER, TAIL 3 부분으로 나눈다
 * HEAD 부분을 사전식으로 정렬한다 (대소문자 구분 안함)
 * NUMBER 숫자를 정렬한다 (앞의 0은 무시) e.g. MUZI01.zip과 muzi1.png 파일명 순서는 동일
 * HEAD와 NUMBER가 같다면 원래 순서 유지
 *
 * [파라미터]
 * files: 1000개 이하의 파일명을 포함한 배열
 * 중복되는 파일명 없음
 *
 */

function solution(files) {
  const answer = [];
  return answer;
}

const cases = [
  generateTestPair(
    [
      [
        'img12.png',
        'img10.png',
        'img02.png',
        'img1.png',
        'IMG01.GIF',
        'img2.JPG',
      ],
    ],
    [
      'img1.png',
      'IMG01.GIF',
      'img02.png',
      'img2.JPG',
      'img10.png',
      'img12.png',
    ],
  ),
  generateTestPair(
    [
      [
        'F-5 Freedom Fighter',
        'B-50 Superfortress',
        'A-10 Thunderbolt II',
        'F-14 Tomcat',
      ],
    ],
    [
      'A-10 Thunderbolt II',
      'B-50 Superfortress',
      'F-5 Freedom Fighter',
      'F-14 Tomcat',
    ],
  ),
];
