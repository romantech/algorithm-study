import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 게임 캐릭터를 아래 4가지 명령어로 움직이려고 함
 * U: 위로 한 칸, D: 아래로 한 칸, R: 우측으로 한 칸, L: 좌측으로 한 칸
 * 캐릭터는 좌표 평면의 (0,0) 위치에서 시작
 * 좌표 평면의 경계는 왼쪽 위(-5,5), 왼쪽 아래(-5,-5), 오른쪽 위(5,5), 오른쪽 아래(5,-5)
 * 게임 캐릭터가 지나간 길 중 캐릭터가 처음 걸어본 길의 길이 반환
 * 좌표 평면의 경계를 넘어가는 명령어는 무시하고 다음 명령어대로 진행
 *
 * [파라미터]
 * dirs: 명령어 문자열 'U', 'D', 'R', 'L'만 주어짐
 * dirs 길이는 500 이하의 자연수
 */

function solution(dirs) {
  const answer = 0;
  return answer;
}

const cases = [generateTestPair(['ULURRDLLU'], 7), generateTestPair(['LULLLLLLU'], 7)];
