function solution(arr1, arr2) {
  return arr1.map((firstArr, idx1) => {
    return firstArr.map((el, idx2) => {
      return arr2[idx1][idx2] + el;
    });
  });
}

const case1 = {
  arr1: [
    [1, 2],
    [2, 3],
  ],
  arr2: [
    [3, 4],
    [5, 6],
  ],
  result: [
    [4, 6],
    [7, 9],
  ],
};

const case2 = {
  arr1: [[1], [2]],
  arr2: [[3], [4]],
  result: [[4], [6]],
};

console.log(solution(case1.arr1, case1.arr2));
