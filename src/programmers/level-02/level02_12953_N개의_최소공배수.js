/**
 * n개의 숫자를 담은 배열 arr을 받아 이 수들의 최소공배수 반환
 * 최소공배수는 입력된 두 수의 배수(n이 14라면 14*1, 14*2, ...) 중 공통이 되는 가장 작은 숫자
 * e.g. [2, 7] -> 14
 * arr은 길이 1이상, 15이하
 * arr 요소는 100 이하 자연수
 */

function solution(arr) {
  const sortedArray = arr.sort((a, b) => b - a);
  const [biggest, ...rest] = sortedArray;

  const isDivisible = (target) => rest.every((n) => target % n === 0);

  let lcmFound = false;
  let multiplier = 1;
  let leastCommonMultiple = -1;

  while (!lcmFound) {
    const currentNum = biggest * multiplier;
    lcmFound = isDivisible(currentNum);
    if (lcmFound) leastCommonMultiple = currentNum;
    multiplier++;
  }

  return leastCommonMultiple;
}

const cases = [
  {
    input: [2, 6, 8, 14],
    output: 168,
  },
  {
    input: [1, 2, 3],
    output: 6,
  },
];

/**
 * 최대공약수(Greatest Common Divisor, GCD)는 두 개 이상의 정수가 공통으로 가지는 약수 중 가장 큰 수
 * 약수는 어떤 수를 나누어 떨어지게 하는 수(나머지 0)
 * 12의 약수: 1, 2, 3, 4, 6, 12
 * 15의 약수: 1, 3, 5, 15
 * 12, 15의 공통 약수는 1, 3이고, 가장 큰 수는 3이므로 최대공약수는 3
 *
 * 유클리드 알고리즘은 최대공약수를 찾는 효율적인 방법 (입력값 n이 커질수록 문제 해결 단계가 로그만큼 감소하는 로그 시간 복잡도)
 * a, b 두 수가 주어졌을 때 (b)와 (a를 b로 나눈 나머지)의 최대 공약수는 a, b의 최대공약수와 동일하다는 특성을 이용한 방법
 *
 * 예를들어 a = 48, b = 18이 주어졌을 때
 * f(48, 18) -> 18(b), 12(48 mod 18)의 최대 공약수는 48(a)와 18(b)의 최대공약수와 동일하다
 * f(18, 12) -> 12(b), 6(18 mod 12)의 최대 공약수는 18(a)와 12(b)의 최대공약수와 동일하다
 * f(12, 6) -> 12(a) mod 6(b)가 0이므로 두 수의 최대공약수는 6(b)이다
 *
 * 만약 a가 b보다 작다면, 항상 첫 번째 재귀 호출에서 a와 b의 위치가 바뀜
 * 예를들어 a = 18, b = 48 이라면...
 * f(18, 48) -> 48(b), 18(18 mod 48)
 * f(48, 18) -> 18(b), 12(48 mod 18)
 */
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// 최소공배수(Least Common Multiple, LCM) 찾기
// a, b 두 수의 곱을 a, b 최대공약수로 나누면, 두 수의 최소공배수를 계산할 수 있다
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function reference(arr) {
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }

  return result;
}

console.log(reference(cases[0].input));
console.log(solution(cases[1].input));
