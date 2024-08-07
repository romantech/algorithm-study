// 노션 노트 : https://www.notion.so/colorfilter/TIL-f439f36939b747a890774560b333f7f6

import { swap } from '../utils.js';

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
    }
  }
  return arr;
};

bubbleSort([10, 7, 9, 5, 1]); // [1, 5, 7, 9, 10]
