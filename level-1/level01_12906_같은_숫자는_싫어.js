// 중복된 숫자 하나만 남기기

function solution(arr) {
  return arr.filter((el, idx) => el !== arr[idx + 1]);
}

const c1 = [1, 1, 3, 3, 0, 1, 1, 3, 2, 1, 5, 8, 0, 3, 2]; // [1,3,0,1]
const c2 = [4, 4, 4, 3, 3]; // [4,3]

solution(c1); /* ? */
