// array 각 element중 divisor로 나눠떨어지는 값을 오름차순으로 정렬한 배열 반환
// 나눠떨어지는 값 없으면 [-1] 반환
// divisor는 자연수(양의정수)

function solution(arr, divisor) {
  const sorted = arr.sort((a, b) => a - b);

  if (divisor === 1) {
    return sorted;
  }

  const filter = sorted.filter((el) => el % divisor === 0);
  return filter.length ? filter : [-1];
}

const c1 = { arr: [5, 9, 7, 10], divisor: 5 }; // [5, 10]
const c2 = { arr: [2, 36, 1, 3], divisor: 1 }; // [1, 2, 3, 36]
const c3 = { arr: [3, 2, 6], divisor: 10 }; // [-1]

solution(c3.arr, c3.divisor); /* ? */
