import { cases, solution } from '../level02_17683_방금그곡';

describe('프로그래머스 - 레벨 02 - 방금 그곡', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 기대값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
