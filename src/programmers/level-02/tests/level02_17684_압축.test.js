import { cases, reference, solution } from '../level02_17684_압축';

describe('프로그래머스 - 레벨 02 - 압축', () => {
  cases.forEach(({ input, output }) => {
    test(`solution 함수 - 입력값: ${input} => 기대값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });

    test(`reference 함수 - 입력값: ${input} => 기대값: ${output}`, () => {
      expect(reference(...input)).toEqual(output);
    });
  });
});
