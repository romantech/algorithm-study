// 가로길이 n, 세로길이 m인 별을 콜솔로 출력하는 함수
function solution(n, m) {
  const row = '*'.repeat(n) + '\n';
  console.log(row.repeat(m));
}

const case1 = {
  n: 5,
  m: 3,
  result: '*****\n*****\n*****',
};

solution(case1.n, case1.m);
