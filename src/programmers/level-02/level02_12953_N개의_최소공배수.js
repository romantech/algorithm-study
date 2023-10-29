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

  const isDivisible = target => rest.every(n => target % n === 0);

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
 * 최대공약수(Greatest Common Divisor)는 두 개 이상의 정수가 공통으로 가지는 약수 중 가장 큰 수
 * 약수는 어떤 수를 나누어 떨어지게 하는 수(나머지 0)
 * 12의 약수: 1, 2, 3, 4, 6, 12
 * 15의 약수: 1, 3, 5, 15
 * 12, 15의 공통 약수는 1, 3이고, 가장 큰 수는 3이므로 최대공약수는 3
 *
 * 유클리드 알고리즘은 최대공약수를 찾는 효율적인 알고리즘 (입력값 n이 커질수록 문제 해결 단계가 로그만큼 감소하는 로그 시간 복잡도)
 * a, b 두 수가 주어졌을 때 b와 a를 b로 나눈 나머지의 최대 공약수는 a, b의 최대공약수와 동일하다는 특성
 * 예를들어 a = 48, b = 18이 주어졌을 때
 * f(48, 18) -> 18(b), 12(48 mod 18)의 최대 공약수는 48(a)와 18(b)의 최대 공약수와 동일하다
 * f(18, 12) -> 12(b), 6(18 mod 12)의 최대 공약수는 18(a)와 12(b)의 최대 공약수와 동일하다
 * f(12, 6) -> 6(b), 0(12 mod 6)이므로 b가 0이 되어 최대 공약수는 6이다
 */
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// 최소공배수 찾기
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

console.log(solution(cases[1].input));
