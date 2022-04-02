function solution(arr1, arr2) {
  return arr1.map((firstArr, idx1) => {
    return firstArr.map((el, idx2) => {
      return arr2[idx1][idx2] + el;
    });
  });
}

// 레퍼런스 (로직 똑같지만 화살표 함수 써서 더 간결함)
function solution2(A, B) {
  return A.map((a, i) => a.map((b, j) => b + B[i][j]));
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
