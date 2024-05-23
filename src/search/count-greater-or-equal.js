/**
 * Counts the number of elements in a sorted array that are greater than or equal to a target value.
 *
 * @param {Array} sortedArr - The sorted array to search in.
 * @param {number} target - The target value to compare against.
 * @return {number} The number of elements in the array that are greater than or equal to the target value.
 */
const countGreaterOrEqual = (sortedArr, target) => {
  let left = 0;
  let right = sortedArr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (sortedArr[mid] >= target) right = mid;
    else left = mid + 1;
  }

  return sortedArr.length - left; // target 보다 크거나 같은 요소의 개수
};

export default countGreaterOrEqual;
