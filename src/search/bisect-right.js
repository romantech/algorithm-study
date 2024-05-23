/**
 * Finds the rightmost index at which the element should be inserted in a sorted array
 * while maintaining its sorted order.
 *
 * @param {Array} sortedArr - The sorted array to search in.
 * @param {number} target - The element to search for.
 * @return {number} The rightmost index where the element should be inserted.
 */
const bisectRight = (sortedArr, target) => {
  let left = 0;
  let right = sortedArr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArr[mid] <= target) left = mid + 1;
    else right = mid;
  }
  return left;
};

// const arr = [1, 2, 4, 4, 6];
// console.log(bisectRight(arr, 4)); // 4
// console.log(bisectRight(arr, 3)); // 2

export default bisectRight;
