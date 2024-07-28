// arr의 가장 작은 수를 제거한 배열을 리턴하는 함수

function solution(arr) {
  if (arr.length <= 1) return [-1];
  const minNum = Math.min(...arr);
  return arr.filter((el) => el !== minNum);
}

const c1 = {
  c: [4, 3, 2, 1],
  a: [4, 3, 2],
};

const c2 = {
  c: [10],
  a: [-1],
};

const c3 = {
  c: [2],
  a: [-1],
};

[c1, c2, c3].forEach(({ c, a }, idx) => {
  const res = solution(c);

  if (JSON.stringify(res) !== JSON.stringify(a)) {
    console.log(`${idx + 1}번 케이스 실패`);
  } else {
    console.log(`${idx + 1}번 케이스 통과`);
  }
});
