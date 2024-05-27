import { generateTestPair } from '../../utils.js';

/*
 * [요구사항]
 * 다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의한다
 * (), [], {}는 모두 올바른 괄호 문자열
 * 만약 A가 올바른 괄호 문자열이라면, (A), [A], {A}도 올바른 괄호 문자열
 * 예를들어 []과 올바른 괄호 문자열이므로 ([])도 올바른 괄호 문자열
 * 만약 A, B가 올바른 괄호 문자열이라면, AB도 올바른 괄호 문자열
 * 예를들어 {}와 ([])가 올바른 괄호 문자열이므로 {}([])도 올바른 괄호 문자열
 *
 * 대괄호, 중괄호, 소괄호로 이뤄진 문자열 s가 주어졌을 때, s를 왼쪽으로 x (0 <= x < s.length) 칸만큼 회전시켰을 때 s가 올바른 괄호 문자열이 되게 하는 x이 개수 반환
 *
 * [매개변수]
 * s: 길이 1이상 1000 이하
 *
 * [예시]
 * s = [](){}
 * x = 0 | [](){} | 올바른 괄호 문자열
 * x = 1 | ](){}[ | 올바르지 않은 괄호 문자열
 * x = 2 | (){}[] | 올바른 괄호 문자열
 * x = 3 | ){}[]( | 올바르지 않은 괄호 문자열
 * x = 4 | {}[]() | 올바른 괄호 문자열
 * x = 5 | }[](){ | 올바르지 않은 괄호 문자열
 * ... return 3
 * */

const bracketPairs = { '[': ']', '(': ')', '{': '}' };

function solution(s) {
  let copiedStr = s;

  const checkBracketsBalance = str => {
    const stack = [];

    for (let i = 0; i < str.length; i += 1) {
      const cur = str[i];
      const last = stack.at(-1);

      if (bracketPairs[last] === cur) stack.pop();
      else stack.push(cur);
    }

    return stack.length === 0;
  };

  let result = 0;

  for (let i = 0; i < s.length; i += 1) {
    if (checkBracketsBalance(copiedStr)) result++;
    copiedStr = copiedStr.slice(1) + copiedStr[0];
  }

  return result;
}

const cases = [
  generateTestPair(['[](){}'], 3),
  generateTestPair(['}]()[{'], 2),
  generateTestPair(['[)(]'], 0),
  generateTestPair(['}}}'], 0),
];

cases.forEach(({ input, output }, i) => {
  const isPassed = solution(...input) === output;
  const msg = isPassed ? '통과' : '실패';
  console.log(`${i + 1}번 케이스 ${msg}`);
});
