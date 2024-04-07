/* eslint-disable camelcase */
import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬
 * 선행 스킬 순서가 스파크 -> 라이트닝 볼트 -> 썬더 일 때 썬더를 배우려면
 * 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 함을 의미
 * 위 순서에 없는 다른 스킬은 순서에 상관없이 배울 수 있음
 * 스파크 -> (힐링) -> 라이트닝 볼트 -> 썬더 스킬트리는 가능하지만
 * 썬더 -> 스파크 혹은 라이트닝 볼트 -> 스파크 -> (힐링) -> 썬더 같은 스킬트리는 불가능
 *
 * 선행 스킬 순서 skill과 유저들이 만든 스킬트리르 담은 배열 skill_trees가 매개변수로 주어질 때
 * 가능한 스킬트리 개수를 리턴하는 solution 함수 작성
 *
 * [제한 조건]
 * 모든 스킬은 알파벳 대문자로 이루어져 있음
 * 스킬 순서와 스킬트리는 문자열로 표현 e.g. CBD는 C -> B -> D
 * skill: 1 이상 26 이하, 중복 값 없음
 * skill_trees: 1 이상 20 이하 배열, 각 요소는 2 이상 26 이하 문자열
 *
 * [예시]
 * skill: CBD | skill_trees: ["BACDE", "CBADF", "AECB", "BDA"]
 * BACDE: C가 뒤에 있으므로 불가
 * CBADF: 가능
 * AECB: 가능
 * BDA: B 전에 C가 없으므로 불가
 */

function solution(skill, skill_trees) {
  const reg = new RegExp(`[^${skill}]`, 'g'); // skill과 다른 문자열만 매칭

  return skill_trees.reduce((acc, cur) => {
    const filter = cur.replace(reg, '');

    const valid = [...filter].every((s, i) => {
      const idx = skill.indexOf(s);
      return idx === i;
    });

    return valid ? acc + 1 : acc;
  }, 0);
}

const cases = [
  generateTestPair(['CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']], 2),
  generateTestPair(['CBD', ['AEF', 'HIJ', 'KLM']], 3), // 선행 스킬 순서에 없는 스킬만 있는 경우
  generateTestPair(['CBD', ['DCB', 'BCD']], 0), // 선행 스킬 순서가 모두 포함되어 있지만 순서가 잘못된 경우
  generateTestPair(['CBD', ['C', 'B', 'D']], 1), // 선행 스킬이 일부만 포함되어 있는 경우
];

console.log(solution(...cases[0].input));
