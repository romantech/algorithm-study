import { cases, reference, solution } from '../level02_42584_주식가격';

describe('프로그래머스 - 레벨 02 - 주식가격', () => {
  cases.forEach(({ input, output }) => {
    test(`solution 함수 테스트 - 입력값: ${input} => 기대값: ${output}`, () => {
      expect(solution(...input)).toEqual(output);
    });

    test(`reference 함수 테스트 - 입력값: ${input} => 기대값: ${output}`, () => {
      expect(reference(...input)).toEqual(output);
    });
  });
});
