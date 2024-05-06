import { cases, solution } from '../level02_12909_올바른_괄호';
import { measureExecutionTime } from '../../../utils';

describe('프로그래머스 - 레벨 02 - 올바른 괄호', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: ${input} => 기대값: ${output}`, () => {
      const { result, executionTime } = measureExecutionTime(solution, input);
      console.log(`입력값: ${input} - 실행 시간: ${executionTime}ms`);
      expect(result).toEqual(output);
    });
  });
});
