import { cases, solution } from '../level02_42888_오픈채팅방';

describe('프로그래머스 - 레벨 02 - 오픈채팅방', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 예상값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
