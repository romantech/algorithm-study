// 노션 노트 : https://www.notion.so/colorfilter/TIL-f439f36939b747a890774560b333f7f6

import { swap } from '../utils.js';

const insertionSort = arr => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // arr[j] 왼쪽 요소가 더 큰지 확인
      swap(arr, j, j - 1);
      j--;
    }
  }
  return arr;
};

insertionSort([10, 7, 9, 5, 1]); // [1, 5, 7, 9, 10]
