/**
 * Finds the leftmost index at which the element can be inserted in a sorted array
 * while maintaining its sorted order.
 *
 * @param {Array} sortedArr - The sorted array to search in.
 * @param {number} target - The element to search for.
 * @return {number} The leftmost index where the element can be inserted.
 * {@link https://colorfilter.notion.site/TIL-Binary-Search-Algorithm-671538a6b47443d9a2679c7ba1b248c3 Romantech} - explanation
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
