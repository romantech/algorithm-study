// 두 수를 입력받아 두 수의 최대 공약수와 최소공배수 반환
// 0번째 인덱스 최대 공약수, 1번째 인덱스 최소공배수
// 최대공약수(공통된 약수중 가장 큰것)
// 최소공배수(공통된 배수 중 가장 작은 것) -> a * b / 최대공약수

function solution(n, m) {
  const factors = [n, m].map(num => {
    const result = [];
    for (let i = 1; i <= num; i += 1) {
      if (num % i === 0) {
        result.push(i);
      }
    }
    return result;
  });
  const minIdx = Math.min(n, m) === n ? 0 : 1;
  const maxIdx = minIdx === 0 ? 1 : 0;
  const gcd = factors[minIdx].reduce((acc, cur) => (factors[maxIdx].includes(cur) ? cur : acc));
  return [gcd, (n * m) / gcd];
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

// 레퍼런스 (유클리드 호제법)
// a,b가 나누어지면 b가 최대 공약수 (a>b)
// a,b가 나누어지지 않으면 b와 a를 b로 나눈 나머지(r)를 다시 나눈다
// 서로 나누어지면 a%b 가 최대공약수이다.
// 나누어지지 않는다면 위처럼 b와 r(a를 b를 나눈 나머지)를 다시 나눈다.
function gcdlcm(a, b) {
  const gcd = calc_gcd(a, b);
  const lcm = (a * b) / gcd;

  return [gcd, lcm];
}

// eslint-disable-next-line camelcase
function calc_gcd(a, b) {
  if (b === 0) return a;
  return a > b ? calc_gcd(b, a % b) : calc_gcd(a, b % a);
}
