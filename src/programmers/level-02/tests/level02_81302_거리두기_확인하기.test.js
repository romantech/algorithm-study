import { cases, iterativeSolution, bfsSolution } from '../level02_81302_거리두기_확인하기';

describe('프로그래머스 | 레벨 2 | 거리두기 확인하기', () => {
  cases.forEach(({ input, output, desc }, i) => {
    test(`${i + 1}번 테스트 케이스 iterativeSolution 함수
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    기대값: ${JSON.stringify(output)}
    --------------------------------------------`, () => {
      expect(iterativeSolution(...input)).toEqual(output);
    });

    test(`${i + 1}번 테스트 케이스 bfsSolution 함수
    설명: ${desc || '기본 테스트'}
    입력값: ${JSON.stringify(input)}
    기대값: ${JSON.stringify(output)}
    --------------------------------------------`, () => {
      expect(bfsSolution(...input)).toEqual(output);
    });
  });
});
