/**
 * [요구사항]
 * K 칸 앞으로 점프 : K 만큼 건전지 사용량 줄어듬
 * 순간이동(현재까지 온 거리 × 2) : 건전지 사용량 없음
 * 건전지 사용량은 최소화하면서 N만큼 떨어져 있는 장소로 이동
 * 매개변수 : N = 1 <= 10억, K = 1이상 자연수
 * e.g. 거리(N)가 5만큼 떨어져 있는 장소로 갈 때
 * 1. 처음 위치 0에서 5칸 앞으로 점프 : 건전지 사용량 5
 * 2. 시작 -> 2칸 점프 -> 순간 이동(2*2=4) -> 1칸 점프 : 건전지 사용량 3
 * 3. 시작 -> 1칸 점프 -> 순간 이동(1*2=2) -> 순간 이동(2*2=4) -> 1칸 점프 : 건전지 사용량 2
 */

/**
 * [풀이방법]
 * 목적지부터 반대로 계산해보면 짝수 거리는 순간 이동을 통해 2로 나누면 되고,
 * 홀수 거리는 1을 빼서(점프 1회) 짝수로 만든 후 다시 순간 이동하면 됨.
 * 즉, 목적지 N이 주어졌을 때 짝수면 2로 나누고, 홀수면 1을 빼는 과정을 반복해서
 * 1을 뺀 횟수가 최소 건전지 사용량이 됨
 */

function solution(n) {
  let rest = n;
  let c = 0;

  while (rest > 0) {
    if (rest % 2 !== 0) {
      rest -= 1;
      c++;
    } else rest /= 2;
  }

  return c;
}

/**
 * 이진수는 왼쪽으로 한 자리씩 이동할 때마다 비트의 가중치가 2배씩 증가한다
 * 5의 이진수는 101이고 1*2^0 + 0*2^1 + 1*2^2 = 1+0+4와 같다
 * 이처럼 이진수에선 왼쪽으로 1자리 이동할 때마다 해당 비트의 가중치가 2배로 증가한다
 * 문제에서 순간이동은 거리를 2배로 늘리는데 이는 이진수에서 왼쪽으로 한 자리 이동하는 것과 같다
 * 이러한 특성 때문에 이진수 자체를 "거리"로 생각해볼 수 도 있다 (1은 점프, 0은 순간이동)
 * ---------------------------------------
 * 1 : 점프 / 이동거리 0+1 /건전지 1 사용
 * 0 : 순간이동 / 이동거리 1*2=2 / 건전지 0 사용
 * 1 : 점프 / 이동거리 2+1 / 건전지 1 사용
 * ---------------------------------------
 * 이진수에서 1이 나온 자리에서 건전지를 사용하므로 사실상 1의 개수만 세면 되는 것이다.
 */
const reference = n => {
  const binary = n.toString(2); // n을 이진수로 변환
  const c = binary.match(/1/g) ?? []; // 1만 찾아서 추가
  return c.length;
};

const cases = [
  {
    input: 5,
    output: 2,
  },
  {
    input: 6,
    output: 2,
  },
  {
    input: 5000,
    output: 5,
  },
];

console.log(reference(cases[2].input));
