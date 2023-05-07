import solution from '../level01_161989_덧칠하기.js'

describe('solution', () => {
  const cases = [
    {
      input: [8, 4, [2, 3, 6]],
      output: 2,
    },
    {
      input: [5, 4, [1, 3]],
      output: 1,
    },
    {
      input: [4, 1, [1, 2, 3, 4]],
      output: 4,
    },
  ];

  test.each(cases)('with input %#', ({ input, output }) => {
    expect(solution(...input)).toEqual(output);
  });
});