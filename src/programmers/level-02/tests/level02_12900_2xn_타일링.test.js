import { cases, solution } from '../level02_12900_2xn_타일링';

describe('프로그래머스 - 레벨 02 - 2xn 타일링', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 기대값: ${output}`, () => {
      expect(solution(input)).toEqual(output);
    });
  });
});
