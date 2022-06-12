// Basic Quick Sort (not in place / stable)
// 구현하기 쉽지만 메모리 공간 낭비 심함 / 중복 데이터 순서 안바뀜
// via https://bit.ly/3zwcIPq
import { swap } from '../utils.js';

const quickSort1 = array => {
  if (array.length <= 1) return array; // Base Case

  // 배열 분할을 위한 기준 요소 선택 및 left, right 하위 배열 생성
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];

  // 피벗 요소보다 작으면 left 하위 배열에 추가, 피벗 요소보다 크면 right 하위 배열에 추가
  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) left.push(array[i]);
    else right.push(array[i]);
  }

  // 정렬된 배열을 얻기 위해 재귀 호출로 위 과정 반복
  return quickSort1(left).concat(pivot, quickSort1(right));
};

quickSort1([85, 24, 63, 45, 17, 31, 96, 50]);
/* quickSort1 시뮬레이션
①f([85, 24, 63, 45, 17, 31, 96, 50])
=======================================
pivot = 45, arr = [85, 24, 63, 17, 31, 96, 50]
left = [24, 17, 31], right = [85, 63, 96, 50]
concat ②f([24, 17, 31]) + 45 + ⑦f([85, 63, 96, 50])
---------------------------------------
return [17, 24, 31, 45, 50, 63, 85, 96]

②f([24, 17, 31])
=======================================
pivot = 17, arr = [24, 31]
left = [], right = [24, 31]
concat ③[] + 17 + ④f([24, 31])
---------------------------------------
return [17, 24, 31]

④f([24, 31])
=======================================
pivot = 24, arr = [31]
left = [], right = [31]
concat ⑤[] + 24 + ⑥f([31])
---------------------------------------
return [24, 31]

⑦f([85, 63, 96, 50])
=======================================
pivot = 63, arr = [85, 96, 50]
left = [50], right = [85, 96]
concat ⑧f([50]) + 63 + ⑨f([85, 96])
---------------------------------------
return [50, 63, 85, 96]

⑨f([85, 96]
=======================================
pivot = 85, arr = [96]
left = [], right = [96]
concat ⑩[] + 85 + ⑪f([96])
---------------------------------------
return [85, 96]
*/

// In place Quick Sort (in place / unstable)
// 메모리 공간 절약 / 중복 데이터 순서 바뀔 수 있음
// via https://www.guru99.com/quicksort-in-javascript.html
function quickSort2(arr) {
  return quick(arr, 0, arr.length - 1);
}

function quick(arr, left, right) {
  let i;
  if (arr.length > 1) {
    i = partition(arr, left, right); // index returned from partition
    if (left < i - 1) quick(arr, left, i - 1); // more elements on the left side of the pivot
    if (i < right) quick(arr, i, right); // more elements on the right side of the pivot
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)]; // Middle element

  let i = left; // left pointer
  let j = right; // right pointer

  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;

    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}

console.time('quickSort');
quickSort2([5, 3, 8, 4, 9, 1, 6, 2, 7]);
console.timeEnd('quickSort');
