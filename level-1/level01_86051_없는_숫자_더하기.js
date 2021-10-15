// 0~9 숫자중 없는 숫자의 합 리턴

function solution(numbers) {
  const sorted = new Set(numbers.sort());

  return [...Array(10).keys()].reduce((acc, cur) => {
    if (!sorted.has(cur)) {
      return acc + cur;
    }
    return acc;
  }, 0);
}

solution([1, 2, 3, 4, 6, 7, 8, 0]); // 14

// * 레퍼런스

function solution2(numbers) {
  return 45 - numbers.reduce((cur, acc) => cur + acc, 0);
}
