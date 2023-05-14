import { cases, solution, solution2 } from '../level01_172928_공원 산책.js';

describe('프로그래머스 - 레벨 01 - 공원 산책', () => {
  test.each(cases)(
    'solution1 - 입력값: $park, $routes => 예샹값: $output',
    ({ park, routes, output }) => {
      expect(solution(park, routes)).toEqual(output);
    },
  );

  test.each(cases)(
    'solution2 - 입력값: $park, $routes => 예샹값: $output',
    ({ park, routes, output }) => {
      expect(solution2(park, routes)).toEqual(output);
    },
  );
});
