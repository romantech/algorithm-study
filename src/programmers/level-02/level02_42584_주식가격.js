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

const cases = [generateTestPair([[1, 2, 3, 2, 3]], [4, 3, 1, 1, 0])];

console.log(solution(...cases[0].input));
