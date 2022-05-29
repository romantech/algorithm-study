/* eslint-disable no-param-reassign */
// 노션 노트 : https://www.notion.so/colorfilter/TIL-6b2c98fc9bfa4f8b901d21c988917707
import { Compare, defaultCompare, makeRandomArr } from '../utils.js';

const merge = (left, right, compare) => {
  let i = 0;
  let j = 0;
  const result = [];
  // left 혹은 right 의 모든 요소가 결과 배열에 추가될 때까지 반복
  while (i < left.length && j < right.length) {
    const isLeft = compare(left[i], right[j]) === Compare.LESS_THAN;
    result.push(isLeft ? left[i++] : right[j++]);
  }
  // 나머지 리스트의 남은 요소를 결과 배열에 추가
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
};

const mergeSort = (arr, compare = defaultCompare) => {
  // 배열 길이가 1이 될때까지 배열 분할
  if (arr.length > 1) {
    const { length } = arr;
    const middle = Math.floor(length / 2); // 분할 | [5, 4, 3, 2, 1] -> middle: 2, ...
    const left = mergeSort(arr.slice(0, middle)); // 정복 | [5, 4], ...
    const right = mergeSort(arr.slice(middle, length)); // 정복 | [3, 2, 1], ...
    arr = merge(left, right, compare); // 결합
  }
  return arr;
};

const randomArr = makeRandomArr(20, 20);
mergeSort(randomArr);
mergeSort([21, 10, 12, 20, 25, 13, 15, 22]); // [10, 12, 13, 15, 20, 21, 22, 25]
