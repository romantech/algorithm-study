import bisectLeft from './bisect-left.js';
import bisectRight from './bisect-right.js';

/**
 * Counts the number of elements in a sorted array that are greater than or equal to the target value.
 *
 * @param {number[]} sortedArr - The array in which to count, assumed to be sorted.
 * @param {number} target - The target value to compare against.
 * @returns {number} The count of elements greater than or equal to the target value.
 */
export const countGreaterOrEqual = (sortedArr, target) => {
  const leftIndex = bisectLeft(sortedArr, target);
  return sortedArr.length - leftIndex;
};

/**
 * Counts the number of elements in a sorted array that are less than or equal to the target value.
 *
 * @param {number[]} sortedArr - The array in which to count, assumed to be sorted.
 * @param {number} target - The target value to compare against.
 * @returns {number} The count of elements less than or equal to the target value.
 */
export const countLessOrEqual = (sortedArr, target) => {
  return bisectRight(sortedArr, target);
};

// const arr = [1, 2, 4, 4, 6];
// console.log(countGreaterOrEqual(arr, 4)); // 3
// console.log(countLessOrEqual(arr, 4)); // 4
