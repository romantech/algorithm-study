/**
 * [요구사항]
 * 같은 알파벳이 2개 붙어있는 짝을 찾은 후,그 둘을 제거한 뒤 앞뒤로 이어붙이는 작업 반복
 * 모든 문자열을 제거했으면 1을 반환하고, 아니면 0 반환
 * e.g. 'baabaa'
 * 'aa' 제거 -> 'bbaa'
 * 'bb' 제거 -> 'aa'
 * 'aa' 제거 -> ''
 * 모든 문자열을 제거할 수 있으므로 1반환
 * 문자열 길이: 1,000,000이하의 자연수
 * 모든 문자열은 소문자
 */

function solution(s) {
  const stack = [];

  for (const char of s) {
    if (stack.length && stack.at(-1) === char) stack.pop();
    else stack.push(char);
  }

  return stack.length ? 0 : 1;
}

/**
 * 'baabaa'
 * b -> ['b']
 * a -> ['b', 'a']
 * a -> ['b']
 * b -> []
 * a -> ['a']
 * a -> []
 */

/**
 * 'cdcd'
 * 'c' -> ['c']
 * 'd' -> ['c', 'd']
 * 'c' -> ['c', 'd', 'c']
 * 'd' -> ['c', 'd', 'c', 'd']
 */
const cases = [
  {
    input: 'baabaa',
    output: 1,
  },
  {
    input: 'cdcd',
    output: 0,
  },
];

console.log(solution(cases[0].input));
