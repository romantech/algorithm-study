import { cases, solution } from '../level01_161989_덧칠하기.js';

describe('프로그래머스 - 레벨 01 - 덧칠하기', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 예상값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
