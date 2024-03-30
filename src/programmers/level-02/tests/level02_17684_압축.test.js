import { cases, solution } from '../level02_17684_압축';

describe('프로그래머스 - 레벨 02 - 압축', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 예상값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
