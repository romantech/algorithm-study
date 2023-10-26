/**
 * 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 JadenCase로 변환
 * 첫 문자가 알파벳이 아닐때는 그대로 두고, 나머지 알파벳만 모두 소문자로 변환
 * s 문자열 길이 1~200, 알파벳/숫자/공백 문자(" ")로 이뤄져 있음
 */

export function solution(s) {
  const splitted = s.split(' ');

  return splitted.reduce((acc, cur, i, { length }) => {
    const isLast = length - 1 === i;

    // '' 빈문자열을 ''.charAt(0)으로 조회하면 빈문자열 '' 반환 -> 주어진 인덱스에 문자 없으면 빈문자열 반환
    // '' 빈문자열을 브라켓노테이션 ''[0]으로 조회하면 undefined 반환 -> 주어진 인덱스에 문자 없으면 undefined 반환
    let first = cur.charAt(0); // cur[0] ?? '' 과 동일하다고 볼 수 있음
    let rest = cur.slice(1);

    first = first.toUpperCase();
    rest = rest.toLowerCase(); // 알파벳이거나 알파벳이 아니어도 첫 글자를 제외한 나머지 문자는 항상 소문자로 변환

    return acc + first + rest + (isLast ? '' : ' ');
  }, '');
}

export const cases = [
  {
    input: '3people unFollowed me',
    output: '3people Unfollowed Me',
  },
  {
    input: 'for the last week',
    output: 'For The Last Week',
  },
  {
    input: 'a   b', // 반례 (특정 알고리즘이나 함수가 제대로 동작하지 않는 특별한 경우나 조건)
    output: 'A   B',
  },
  {
    input: '1HELLO 1WORLD', // 반례
    output: '1hello 1world',
  },
];

console.log(solution(cases[2].input));
