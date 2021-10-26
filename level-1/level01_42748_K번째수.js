// 배열 i번째 숫자부터 j번째 숫자까지 자르고, 정렬 후, k번째에 있는 수를 구하시오
// commands 길이는 1~50, 각 요소의 길이는 3 -> [[...], [...]]
// array 길이는 1이상 100이하(각 요소도 1~100) -> [...]

function solution(array, commands) {
  // i번째부터 j번째까지 자르고
  // 정렬 후
  // k번째의 수를 구해서
  // 결과 배열에 push

  return commands.reduce((acc, cur) => {
    const start = cur[0] - 1;
    const end = cur[1];
    const seq = cur[2] - 1;
    return acc.concat(array.slice(start, end).sort((a, b) => a - b)[seq]);
  }, []);
}

solution(
  [1, 5, 2, 6, 3, 7, 4],
  [
    [2, 5, 3],
    [4, 4, 1],
    [1, 7, 3],
  ],
); /* ? */
// [5, 6, 3]
