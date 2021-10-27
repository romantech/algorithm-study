/* eslint-disable no-unused-vars */
function solution(nums) {
  // maxNum 구하고
  // 중복값 제거
  const maxNum = nums.length / 2;
  const deDuplicateLen = [...new Set(nums)].length;
  return deDuplicateLen < maxNum ? deDuplicateLen : maxNum;
}

const c1 = [3, 1, 2, 3]; // 2
const c2 = [3, 3, 3, 2, 2, 4]; // 3
const c3 = [3, 3, 3, 2, 2, 2]; // 2
solution(c2);

// [3, 1, 2]
// [3, 2, 4]
// [3, 2]
