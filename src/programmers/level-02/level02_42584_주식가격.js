import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때,
 * 가격이 떨어지지 않은 기간은 몇 초인지 return
 *
 * [매개변수]
 * prices 각 가격은 1 이상 10,000 이하 자연수
 * prices 길이는 2 이상 100,000 이하
 *
 * [예시]
 * prices = [1, 2, 3, 2, 3]
 * 1초 : ₩1(idx 0)은 끝까지 가격 안떨어짐 -> 4 - 0 = 4
 * 2초 : ₩2(idx 1)은 끝까지 가격 안떨어짐 -> 4 - 1 = 3
 * 3초 : ₩3(idx 2)은 1초 뒤에 2로 가격 떨어짐 (1초간 가격 유지) -> 1
 * 4초 : ₩4(idx 3)은 끝까지 가격 안떨어짐 -> 4 - 3 = 1
 * 5초 : ₩5(idx 4)은 끝까지 가격 안떨어짐 -> 4 - 4 = 0
 * -> [4, 3, 1 ,1, 0]
 */

/** 시간 복잡도 O(n²) */
function solution(prices) {
  const answer = [];
  const len = prices.length;

  for (let i = 0; i < len; i += 1) {
    let count = 0;

    for (let j = i + 1; j < len; j += 1) {
      count++;
      if (prices[j] < prices[i]) break;
    }

    answer.push(count);
  }

  return answer;
}

/**
 * for 문에서 각 요소를 1번씩 순회하고, 최대 1회 while문 의해 처리되므로
 * 시간 복잡도는 O(2n) -> 상수항 무시해서 O(n)
 */
function reference(prices) {
  const len = prices.length;
  const answer = new Array(len).fill(0); // 각 주식 가격이 떨어지지 않은 시간을 저장할 배열
  const stack = []; // 떨어지지 않은 주식 가격의 인덱스를 추적할 스택

  for (let i = 0; i < len; i++) {
    // 현재 주식 가격이 이전 주식 가격보다 떨어졌을 때
    while (stack.length > 0 && prices[i] < prices[stack.at(-1)]) {
      const top = stack.pop();
      answer[top] = i - top; // 가격이 유지된 시간 저장
    }

    stack.push(i); // 현재 가격의 인덱스를 stack에 저장
  }

  // 가격이 떨어지지 않아서 스택에 남아있는 요소 처리
  while (stack.length > 0) {
    const top = stack.pop();
    answer[top] = len - 1 - top;
  }

  return answer;
}

const cases = [
  generateTestPair([[1, 2, 3, 2, 3]], [4, 3, 1, 1, 0]), // 랜덤한 가격 변동
  generateTestPair([[3, 8, 6, 2, 5, 7]], [3, 1, 1, 2, 1, 0]), // 랜덤한 가격 변동
  generateTestPair([[5, 4, 3, 2, 1]], [1, 1, 1, 1, 0]), // 가격이 지속적으로 하락하는 경우
  generateTestPair([[1, 2, 3, 4, 5]], [4, 3, 2, 1, 0]), // 가격이 지속적으로 상승하는 경우
  generateTestPair([[5, 5, 5, 5, 5]], [4, 3, 2, 1, 0]), // 모든 가격이 동일한 경우
];

// cases.forEach(({ input, output }) => {
//   console.log(solution(...input).every((p, i) => p === output[i]));
// });

export { solution, reference, cases };
