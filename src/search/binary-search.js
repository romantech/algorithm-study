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
