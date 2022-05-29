const insertionSort = arr => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // arr[j] 왼쪽 요소가 더 큰지 확인
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]; // swap
      j--;
    }
  }
  return arr;
};

insertionSort([10, 7, 9, 5, 1]); // [1, 5, 7, 9, 10]
