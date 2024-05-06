import { cases, solution } from '../level02_49994_방문길이';

describe('프로그래머스 | 레벨 2 | 방문길이', () => {
  cases.forEach(({ input, output, desc }, i) => {
    test(`${i + 1}번 테스트 케이스
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    예상값: ${output}
    --------------------------------------------`, () => {
      expect(solution(...input)).toEqual(output);
    });
  });
});
