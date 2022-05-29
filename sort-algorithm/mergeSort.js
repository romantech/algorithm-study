/* eslint-disable no-param-reassign */

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

console.log(mergeSort([10, 7, 9, 5, 1]));
