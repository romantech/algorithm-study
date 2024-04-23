import { cases, solution, reference } from '../level02_49993_스킬트리';

describe('프로그래머스 | 레벨 2 | 스킬트리', () => {
  cases.forEach(({ input, output, desc }, i) => {
    test(`${i + 1}번 테스트 케이스 solution 함수
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    예상값: ${output}
    --------------------------------------------`, () => {
      expect(solution(...input)).toEqual(output);
    });

    test(`${i + 1}번 테스트 케이스 reference 함수
    설명: ${desc ?? '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    예상값: ${output}
    --------------------------------------------`, () => {
      expect(reference(...input)).toEqual(output);
    });
  });
});
