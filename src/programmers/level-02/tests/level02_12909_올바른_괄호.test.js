import { cases, solution } from '../level02_12909_올바른_괄호';

describe('프로그래머스 - 레벨 02 - 올바른 괄호', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 예상값: ${output}`, () => {
      const start = performance.now();
      const result = solution(input);
      const end = performance.now();

      const executionTime = end - start;
      console.log(
        `입력값: ${input} - 실행 시간: ${executionTime.toFixed(2)}ms`,
      );

      expect(result).toEqual(output);
    });
  });
});
