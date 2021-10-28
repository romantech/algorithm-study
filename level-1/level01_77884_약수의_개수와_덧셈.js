// 1 ≤ left ≤ right ≤ 1,000
// left부터 right 숫자에서 약수의 개수가 짝수면 더하고 홀수면 뺀다

function solution1(left, right) {
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

// * 레퍼런스
function solution2(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    /**
     * Number.isInteger는 주어진 수가 정수(0, +1, -1...)인지 판별, Boolean 리턴
     * 제곱근이 정수면, 약수의 갯수는 홀수. 제곱근이 정수가 아니면(1.2222...) 약수의 갯수는 짝수
     * ex) 25의 제곱근은 5, 약수의 갯수는 1, 5, 25
     * ex) 9의 제곱근은 3, 약수의 갯수는 1, 3, 9
     * 즉 제곱근이 정수면 약수는 항상 1, 제곱근, 자신 이렇게 3개가 된다
     */
    if (Number.isInteger(Math.sqrt(i))) {
      answer -= i;
    } else {
      answer += i;
    }
  }
  return answer;
}

const case1 = {
  left: 13,
  right: 17,
}; // 43
solution2(case1.left, case1.right); /* ? */
