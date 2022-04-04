// 정수 x와 자연수 n을 받아 x 부터 시작해 x 씩 증가하는 숫자를 n개 지니는 리스트 리턴
function solution(x, n) {
  return Array(n)
    .fill(x)
    .reduce((acc, cur, idx) => {
      const num = idx === 0 ? cur : acc[acc.length - 1] + cur;
      return acc.concat(num);
    }, []);
}

console.log(solution(-4, 2));

const case1 = {
  x: 2,
  n: 5,
  result: [2, 4, 6, 8, 10],
};

const case2 = {
  x: 4,
  n: 3,
  result: [4, 8, 12],
};

const case3 = {
  x: -4,
  n: 2,
  result: [-4, -8],
};
