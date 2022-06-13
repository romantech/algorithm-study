/* eslint-disable consistent-return */
// Basic Quick Sort (not in place / stable)
// 구현하기 쉽지만 메모리 공간 낭비 심함 / 중복 데이터 순서 안바뀜
// via https://bit.ly/3zwcIPq

import { makeRandomArr, swap } from '../utils.js';

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
// reference1: https://www.guru99.com/quicksort-in-javascript.html
// reference2: https://bit.ly/3QjduFC
function quickSort2(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return; // Base Case

  const borderIndex = partition(arr, start, end); // 배열을 나누는 경계 인덱스
  quickSort2(arr, start, borderIndex - 1); // borderIndex 왼쪽 요소
  quickSort2(arr, borderIndex, end); // borderIndex 오른쪽 요소

  return arr;
}

function partition(arr, start, end) {
  const pivot = arr[Math.floor((start + end) / 2)]; // 가운데 요소를 피벗으로 설정

  let i = start; // start(왼쪽 끝) 포인터
  let j = end; // end(오른쪽 끝) 포인터

  // i/j 포인터가 교차해서 순서 바뀔때까지 반복(pivot 왼쪽에 아직 pivot 보다 큰 값이 있다면)
  while (i <= j) {
    while (arr[i] < pivot) i++; // 배열 왼쪽부터 pivot 값 보다 큰 요소의 인덱스 검색
    while (arr[j] > pivot) j--; // 배열 오른쪽부터 pivot 값 보다 작은 요소의 인덱스 검색

    // i/j 아직 교차전이라면(pivot 왼쪽에 아직 pivot 보다 큰 값이 있다면)
    if (i <= j) {
      swap(arr, i, j); // i가 j보다 작다면 i가 더 큰 값이므로 swap
      i++; // 다음 검색을 위해 i + 1
      j--; // 다음 검색을 위해 i - 1
    }
  }

  return i; // 교차 후의 i 인덱스를(pivot 인덱스 + 1) 다음 경계 인덱스로 사용하기 위해 리턴
}

console.time('quickSort1');
quickSort1(makeRandomArr(10000, 10000));
console.timeEnd('quickSort1');

console.time('quickSort2');
quickSort2(makeRandomArr(10000, 10000));
console.timeEnd('quickSort2');
