// 노션 노트 : https://www.notion.so/colorfilter/TIL-f439f36939b747a890774560b333f7f6

import { swap } from '../utils.js';

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) swap(arr, i, min);
  }
  return arr;
};

selectionSort([10, 7, 9, 5, 1]); // [1, 5, 7, 9, 10]
