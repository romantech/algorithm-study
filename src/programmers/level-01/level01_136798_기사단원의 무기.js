// 구매할 공격력은 약수 개수만큼만 가능
// 공격력 1에 1kg 철 필요
// number로 받은 숫자 까지의 모든 약수를 구하고 limit 이하인 숫자의 합 계산

const cases = [
  { input: [5, 3, 2], output: 10 },
  { input: [10, 3, 2], output: 21 },
];

/* ========================================================= */

// 숫자를 받아 해당 숫자의 약수 개수를 구하는 함수
function countDivisors(num) {
  let count = 0;

  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      // i가 num의 제곱수인 경우 ex) 16/4 === 4
      if (num / i === i) count += 1;
      // 2개의 약수를 찾은 경우 ex) 16/2 === 8 (2, 8 두개의 약수 발견)
      else count += 2;
    }
  }

  return count;
}

function solution(number, limit, power) {
  let powers = 0;
  for (let i = 1; i <= number; i += 1) {
    const count = countDivisors(i);
    const num = count <= limit ? count : power;
    powers += num;
  }

  return powers;
}

solution(...cases[0].input);
