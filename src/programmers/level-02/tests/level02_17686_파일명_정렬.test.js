import { cases, solution } from '../level02_17686_파일명_정렬';

describe('프로그래머스 - 레벨 02 - 파일명 정렬', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 예상값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
