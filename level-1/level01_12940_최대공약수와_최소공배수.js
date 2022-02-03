// 두 수를 입력받아 두 수의 최대 공약수와 최소공배수 반환
// 0번째 인덱스 최대 공약수, 1번째 인덱스 최소공배수
// 최대공약수(공통된 약수중 가장 큰것)
// 최소공배수(공통된 배수 중 가장 작은 것)

function solution(n, m) {
  const a = [n, m].map(num => {
    const result = [];
    for (let i = 1; i <= num; i += 1) {
      if (num % i === 0) {
        result.push(i);
      }
    }
    return result;
  });
  const minIdx = n < m ? 0 : 1;
  const maxIdx = n > m ? 0 : 1;
  const resultA = a[minIdx].reduce((acc, cur) => {
    if (a[maxIdx].includes(cur)) {
      return cur;
    }
    return acc;
  });
  return [resultA, (n * m) / resultA];
}

const case1 = {
  n: 3,
  m: 12,
  result: [3, 12],
  // 3: 1, 3
  // 12: 1, 2, 3, 4, 6, 12
};

const case2 = {
  n: 2,
  m: 5,
  result: [1, 10],
};

console.log(solution(case1.n, case1.m));
