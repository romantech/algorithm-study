// 1 ≤ left ≤ right ≤ 1,000
// left부터 right 숫자에서 약수의 개수가 짝수면 더하고 홀수면 뺀다

function solution(left, right) {
  // 약수인지 갯수 확인
  // 약수 갯수가 짝수 여부 확인
  let result = 0;
  const checkFactorsNum = num => {
    let factors = 0;
    for (let i = 1; i <= num; i += 1) {
      if (num % i === 0) {
        factors += 1;
      }
    }

    return factors;
  };

  for (let i = left; i <= right; i += 1) {
    if (checkFactorsNum(i) % 2 === 0) {
      result += i;
    } else {
      result -= i;
    }
  }

  return result;
}

const case1 = {
  left: 13,
  right: 17,
}; // 43
solution(case1.left, case1.right); /* ? */
