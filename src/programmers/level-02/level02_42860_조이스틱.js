import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 조이스틱으로 알파벳 이름 완성, 처음엔 A로만 이루어져 있음
 * 완성해야 하는 이름이 세글자면 AAA, 네 글자면 AAAA
 * name이 매개변수로 주어질 때 조이스틱 조작 횟수의 최솟값 반환
 * ▲ : 다음 알파벳
 * ▼ : 이전 알파벳 (A에서 아래쪽으로 이동하면 Z)
 * ◀ : 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
 * ▶ : 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)
 *
 * "JAZ"는 아래 방법으로 11번 이동시켜서 만들 수 있음
 * ▲ * 9 : J 완성 (ABCDEFGHIJKLMNOPQRSTUVWXYZ)
 * ◀ * 1 : 마지막 문자 위치로 이동
 * ▼ * 1 : Z 완성
 *
 * [매개변수]
 * name: 만들고자 하는 이름, 대문자, 1 이상 20 이하
 */

function solution(name) {
  const answer = 0;
  return answer;
}

const cases = [generateTestPair(['JEROEN'], 56), generateTestPair(['JAN'], 23)];
