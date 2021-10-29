function solution(d, budget) {
  // 최대한 많은 부서를 지원해줘야 하므로 작은 순서대로 sort
  const sorted = d.sort((a, b) => a - b);
  let maxNum = 0;
  let result = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    maxNum += sorted[i];
    if (maxNum <= budget) {
      result += 1;
    } else {
      break;
    }
  }

  return result;
}

const case1 = {
  d: [1, 3, 2, 5, 4],
  b: 9,
}; // 3

const case2 = {
  d: [2, 2, 3, 3],
  b: 10,
};

solution(case2.d, case2.b); /* ? */
