import { cases, solution } from '../level02_43165_타겟_넘버';

describe('프로그래머스 - 레벨 02 - 타겟 넘버', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 기대값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
