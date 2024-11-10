import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * XYZ 마트는 일정 금액을 지불하면 10일 동안 회원 자격을 부여함
 * XYZ 마트에선 회원을 대상으로 매일 한 가지 제품을 할인하는 행사를 함
 * 할인 제품은 하루에 하나만 구매 가능
 * 정현이는 자신이 원하는 제품과 수량이 할인 날짜와 10일 연속으로 일치할 때 회원가입 하려고 함
 *
 * 정현이가 원하는 제품이 바나나 3개, 사과 2개, 쌀 2개, 돼지고기 2개, 냄비 1개이고,
 * XYZ 마트에서 14일간 회원을 대상으로 할인하는 제품이 날짜 순서대로 아래와 같다면...
 * 치킨, 사과, 사과, 바나나, 쌀, 사과, 돼지고기, 바나나, 돼지고기, 쌀, 냄비, 바나나, 사과, 바나나
 *
 * 1일차부터 10일: 냄비가 할인하지 않음
 * 2일차부터 10일: 바나나를 원하는 만큼 구매할 수 없음
 * 3일차부터 10일: 모두 구매 가능
 * 4일차부터 10일: 모두 구매 가능
 * 5일차부터 10일: 모두 구매 가능
 *
 * [매개변수]
 * number: 정현이가 원하는 제품의 수량을 나타내는 정수 배열. 1 <= number <= 10
 * want: 정현이가 원하는 제품을 나타내는 문자열 배열. 1 <= want = number <= 10
 * discount: 마트에서 할인하는 제품을 나타내는 문자열 배열. 10 <= discount <= 10000
 *
 * [반환]
 * 정현이가 원하는 제품을 모두 할인 받을 수 있는 회원등록 날짜의 총 일수
 * 가능한 날이 없으면 0반환
 * */

function solution(want, number, discount) {
  const discountMap = new Map();
  want.forEach((e, i) => discountMap.set(e, number[i]));

  const result = [];

  for (let i = 0; i <= discount.length; i++) {
    const sliced = discount.slice(i, i + 10);
    if (sliced.length >= 10) {
      const dMap = sliced.reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1;
        return acc;
      }, {});

      result.push(dMap);
    }
  }

  return result.reduce((acc, cur) => {
    for (const [k, v] of discountMap.entries()) {
      const count = cur[k] ?? 0;
      if (count < v) return acc;
    }

    return acc + 1;
  }, 0);
}

const cases = [
  generateTestPair(
    [
      ['banana', 'apple', 'rice', 'pork', 'pot'],
      [3, 2, 2, 2, 1],
      [
        'chicken',
        'apple', // a1
        'apple', // a2
        'banana', // b1
        'rice', // r1
        'apple', // a3
        'pork', // p1
        'banana', // b2
        'pork', // p2
        'rice', // r2
        'pot', // p1
        'banana', //  b3
        'apple', // a4
        'banana', // b4
      ],
    ],
    3,
  ),
  generateTestPair(
    [
      ['apple'],
      [10],
      [
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
      ],
    ],
    0,
  ),
];

console.log(solution(...cases[0].input));
