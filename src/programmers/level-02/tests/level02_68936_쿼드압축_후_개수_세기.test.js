import { cases, solution } from '../level02_68936_쿼드압축_후_개수_세기';

describe('프로그래머스 | 레벨 2 | 쿼드압축 후 개수 세기', () => {
  cases.forEach(({ input, output, desc }, i) => {
    test(`${i + 1}번 테스트 케이스
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    예상값: ${JSON.stringify(output)}
    --------------------------------------------`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
