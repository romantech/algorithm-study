import { cases, solution } from '../level02_84512_모음사전';

describe('프로그래머스 | 레벨 2 | 모음사전', () => {
  cases.forEach(({ input, output, desc }, i) => {
    test(`${i + 1}번 테스트 케이스 solution 함수
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    기대값: ${JSON.stringify(output)}
    --------------------------------------------`, () => {
      expect(solution(...input)).toEqual(output);
    });

    test(`${i + 1}번 테스트 케이스 reference 함수
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    기대값: ${JSON.stringify(output)}
    --------------------------------------------`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
