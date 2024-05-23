/**
 * Performs a binary search on a sorted array to find the index of a target element.
 *
 * @param {Array} sortedArr - The sorted array to search in.
 * @param {*} target - The target element to find.
 * @return {number} The index of the target element in the array, or -1 if not found.
 * {@link https://colorfilter.notion.site/TIL-Binary-Search-Algorithm-671538a6b47443d9a2679c7ba1b248c3 Romantech} - explanation
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
