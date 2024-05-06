import { cases, solution } from '../level01_160586_대충 만든 자판.js';

describe('프로그래머스 - 레벨 01 - 대충 만든 자판', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 기대값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
