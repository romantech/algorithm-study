// 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 수 구하기
// nums에 들어있는 숫자의 개수 : 3~50
// nums 각 원소 1~1000이하 자연수, 중복된 숫자 없음

function solution(nums) {
  let answer = 0;

  function isPrime(sum) {
    // 소수는 나누어 떨어지는 수가 1과 자신밖에 없는 수
    // 1은 소수가 아님
    // 2는 소수중에 유일한 짝수
    if (sum <= 1) return false;
    if (sum === 2) return true;

    for (let i = 2; i <= Math.sqrt(sum); i++) {
      if (sum % i === 0) return false;
    }
    return true;
  }

  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        if (isPrime(sum)) {
          answer += 1;
        }
      }
    }
  }

  return answer; /* ? */
}

solution([1, 2, 7, 6, 4]); // 4
// 142(o) 147 146(o)
// 247(o) 246
// 764(o)
// 617
// 712

// 127 126 124
// 176 174
// 164
// 276 274
// 264

// 127 126 124
// 176 174
// 164
// 276
