/* eslint-disable no-param-reassign */

import { Compare, defaultCompare, makeRandomArr } from '../utils';

const merge = (left, right, compare) => {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    const isLeft = compare(left[i], right[j]) === Compare.LESS_THAN;
    const num = isLeft ? left[i++] : right[j++];
    result.push(num);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
};

const mergeSort = (arr, compare = defaultCompare) => {
  if (arr.length > 1) {
    const { length } = arr;
    const middle = Math.floor(length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle, length));
    arr = merge(left, right, compare);
  }
  return arr;
};

const randomArr = makeRandomArr(20, 20);
mergeSort(randomArr);
