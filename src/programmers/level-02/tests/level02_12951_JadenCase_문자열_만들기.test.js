import { cases, solution } from '../level02_12951_JadenCase_문자열_만들기';

describe('프로그래머스 - 레벨 02 - JadenCase 문자열 만들기', () => {
  test.each(cases)('입력값: $input => 예상값: $output', ({ input, output }) => {
    expect(solution(input)).toEqual(output);
  });
});
