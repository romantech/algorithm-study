/**
 * Performs a binary search to find the index of a target value in a sorted array.
 * If the target value is found, returns the index of the target.
 * If the target value is not found, returns -1.
 *
 * @param {number[]} sortedArr - The array in which to search, assumed to be sorted.
 * @param {number} target - The value to search for in the array.
 * @returns {number} The index of the target if found; otherwise, -1.
 */
const binarySearch = (sortedArr, target) => {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArr[mid] === target) return mid;

    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
};

export default binarySearch;

// const arr = [1, 3, 5, 7, 11, 13, 7, 23, 29, 31];
// console.log(binarySearch(arr, 29)); // 8
