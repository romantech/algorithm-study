import { measureExecutionTime } from '../../../utils';
import { cases, solution } from '../level02_12936_줄_서는_방법';

describe('프로그래머스 - 레벨 02 - 줄 서는 방법', () => {
  cases.forEach(({ input, output }) => {
    test(`입력값: [${input}] => 예상값: [${output}]`, () => {
      const { result, executionTime } = measureExecutionTime(solution, ...input);
      console.log(`입력값: ${input} - 실행 시간: ${executionTime}ms`);
      expect(result).toEqual(output);
    });
  });
});
