/**
 * Finds the insertion point for a target value in a sorted array to maintain sorted order.
 * The returned insertion point is before any existing entries of the target in the array.
 *
 * @param {number[]} sortedArr - The array in which to search, assumed to be sorted.
 * @param {number} target - The value to search for in the array.
 * @returns {number} The index at which the target should be inserted to maintain sorted order.
 */
const bisectLeft = (sortedArr, target) => {
  let left = 0;
  let right = sortedArr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
};

// const arr = [1, 2, 4, 4, 6];
// console.log(bisectLeft(arr, 4)); // 2
// console.log(bisectLeft(arr, 3)); // 2

export default bisectLeft;
