import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 모든 괄호를 올바른 순서대로 배치하는 문제
 * ( 개수와 ) 개수가 같다면 균형잡힌 괄호 문자열
 * () 두 괄호의 짝이 맞다면 올바른 괄호 문자열
 * (()))( 괄호 개수가 같아서 "균형잡힌 괄호 문자열"이지만 짝이 안맞아서 "올바른 괄호 문자열"은 아님
 * (())() 는 "균형잡힌 괄호 문자열"이면서 동시에 "올바른 괄호 문자열"
 *
 * ( 와 ) 로만 이루어진 문자열 w가 균형잡힌 괄호 문자열이라면 아래 과정을 통해 올바른 괄호 문자열로 변환 가능
 * 1. 입력이 빈 문자열이면 빈 문자열 반환
 * 2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리. u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열일 수 있음.
 * 3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행.
 *    3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환.
 * 4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정 수행.
 *    4-1. 빈 문자열에 첫 번째 문자로 '('를 붙임.
 *    4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙임.
 *    4-3. ')'를 다시 붙임.
 *    4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙임.
 *    4-5. 생성된 문자열 반환.
 *
 * [예시]
 * p = )(
 * 1. 두 문자열을 u, v로 분리 -> u = )(, v = ""
 * 2. u가 올바른 괄호 문자열이 아니므로 ( + "" ) + "" -> () 반환
 *
 * p = ()))((()
 * 1. 두 문자열을 u, v로 분리 -> u = (), v = ))((()
 * 2. u가 올바른 괄호 문자열이므로 v에 대해 1단계 다시 수행
 *    두 문자열을 u, v로 분리 -> u = ))((, v = ()
 *    u가 올바른 괄호 문자열이 아니므로 -> (())() 반환
 * 3. () + (())() -> ()(())() 반환
 */

const LB = '(';
const RB = ')';

const isBalanced = (str) => {
  let balance = 0;

  for (const char of str) {
    if (char === LB) balance++;
    else if (char === RB) {
      if (balance === 0) return false; // 짝이 맞지 않으므로 false
      balance--;
    }
  }

  return balance === 0;
};

const splitBalancedBrackets = (str) => {
  let count = 0;
  const result = { u: '', v: '' };

  for (let i = 0; i < str.length; i += 1) {
    count += str[i] === LB ? 1 : -1;

    if (count === 0) {
      result.u = str.slice(0, i + 1);
      result.v = str.slice(i + 1);
      break;
    }
  }

  return result;
};

const reverseBracket = (str) => {
  return str.split('').reduce((acc, cur) => {
    return acc + (cur === LB ? RB : LB);
  }, '');
};

function solution(p) {
  if (isBalanced(p) || p === '') return p;

  const { u, v } = splitBalancedBrackets(p);

  // u가 올바른 괄호 문자열이라면
  if (isBalanced(u)) return u + solution(v);

  // u가 올바른 괄호 문자열이 아니라면
  return LB + solution(v) + RB + reverseBracket(u.slice(1, -1));
}

const cases = [
  generateTestPair(['(()())()'], '(()())()'),
  generateTestPair([')('], '()'),
  generateTestPair(['()))((()'], '()(())()'),
];

cases.forEach(({ input, output }, i) => {
  const passed = solution(...input) === output;
  console.log(`${i + 1}번 문제 ${passed ? '통과' : '실패'}`);
});
