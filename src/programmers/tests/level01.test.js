import {
  cases as c161989,
  solution as s161989,
} from '../level-01/level01_161989_덧칠하기.js';
import {
  cases as c160586,
  solution as s160586,
} from '../level-01/level01_160586_대충 만든 자판.js';

describe('프로그래머스 레벨 01', () => {
  test.each(c161989)(
    '덧칠하기 - 입력값: $input 예상값: $output',
    ({ input, output }) => {
      expect(s161989(...input)).toEqual(output);
    },
  );

  test.each(c160586)(
    '대충 만든 자판 - 입력값: $input 예상값: $output',
    ({ input, output }) => {
      expect(s160586(...input)).toEqual(output);
    },
  );
});
