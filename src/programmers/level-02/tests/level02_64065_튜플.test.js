import { cases, solution } from '../level02_64065_튜플';

describe('프로그래머스 | 레벨 2 | 튜플', () => {
  cases.forEach(({ input, output, desc }, i) => {
    test(`${i + 1}번 테스트 케이스
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    기대값: ${output}
    --------------------------------------------`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
