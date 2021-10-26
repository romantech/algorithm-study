// 문제 최대 10000
// 정답은 1, 2, 3, 4, 5 중 하나
// 높은 점수를 받은 사람 여러명이면 오름차순 정렬

function solution(answers) {
  const person = [
    {
      pattern: [1, 2, 3, 4, 5],
      count: 0,
    },
    {
      pattern: [2, 1, 2, 3, 2, 4, 2, 5],
      count: 0,
    },
    {
      pattern: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
      count: 0,
    },
  ];

  answers.forEach((answer, answerIdx) => {
    for (let i = 0; i < person.length; i += 1) {
      const patternIdx = answerIdx % person[i].pattern.length;
      if (person[i].pattern[patternIdx] === answer) {
        person[i].count += 1;
      }
    }
  });

  const maxCount = Math.max(...person.map(el => el.count));
  return person.reduce(
    (acc, cur, idx) => (cur.count === maxCount ? acc.concat(idx + 1) : acc),
    [],
  );
}

solution([1, 3, 2, 4, 2, 2, 5, 7, 1]); /* ? */ // return [1, 2, 3]
// [1, 2, 3, 4, 5] -> [1]
// [1, 3, 2, 4, 2] -> [1, 2, 3]
