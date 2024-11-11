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

const WINDOW_SIZE = 10;

/**
 * 시간복잡도 O(n × m)
 * */
function solution(want, number, discount) {
  const discountMap = new Map();
  want.forEach((e, i) => discountMap.set(e, number[i]));

  const result = [];

  for (let i = 0; i <= discount.length; i++) {
    const sliced = discount.slice(i, i + WINDOW_SIZE);
    if (sliced.length >= WINDOW_SIZE) {
      const wantMap = sliced.reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1;
        return acc;
      }, {});

      result.push(wantMap);
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

/**
 * 슬라이딩 윈도우 방식으로 해결한 코드. 시간복잡도 O(n)
 * 슬라이딩 윈도우: 고정된 크기의 구간을 한 칸씩 이동하면서 배열이나 문자열을 탐색하는 기법
 * 예를들어 요소가 13개인 배열에서 크기 5의 슬라이딩 윈도우(소괄호 부분)로 탐색하면...
 * (1, 2, 3, 4, 5), 6, 7, 8, 9, 10, 11, 12, 13
 * 1, (2, 3, 4, 5, 6), 7, 8, 9, 10, 11, 12, 13
 * 1, 2, (3, 4, 5, 6, 7), 8, 9, 10, 11, 12, 13
 * 1, 2, 3, (4, 5, 6, 7, 8), 9, 10, 11, 12, 13
 * ...
 * 이렇게 한칸씩 오른쪽으로 이동하면서, 각 구간에서 필요한 연산 수행
 * */
function reference(want, number, discount) {
  const wantMap = want.reduce((map, item, i) => map.set(item, number[i]), new Map());
  const windowMap = new Map();
  let count = 0;

  // 초기 윈도우 설정 (첫 10일)
  // chicken => 1, apple => 3, banana => 2, rice => 2, pork => 2
  for (let i = 0; i < WINDOW_SIZE; i++) {
    windowMap.set(discount[i], (windowMap.get(discount[i]) ?? 0) + 1);
  }

  // 현재 윈도우가 조건을 만족하는지 확인
  const checkIfValid = () => {
    for (const [item, qty] of wantMap.entries()) {
      if ((windowMap.get(item) ?? 0) < qty) return false;
    }
    return true;
  };

  // 첫 10일 체크
  if (checkIfValid()) count++;

  // 슬라이딩 윈도우로 탐색
  for (let i = WINDOW_SIZE; i < discount.length; i++) {
    const oldItem = discount[i - WINDOW_SIZE]; // 이전 항목 제거(start)
    const newItem = discount[i]; // 새로 추가된 항목 추가(end)

    // 윈도우 업데이트
    // i10 = chicken => 1, apple => 3, banana => 2, rice => 2, pork => 2
    // i11 = chicken => 0, apple => 3, banana => 2, rice => 2, pork => 2, pot => 1
    // i12 = chicken => 0, apple => 2, banana => 3, rice => 2, pork => 2, pot => 1
    // ...
    windowMap.set(oldItem, windowMap.get(oldItem) - 1);
    windowMap.set(newItem, (windowMap.get(newItem) ?? 0) + 1);

    // 조건 만족 여부 체크
    if (checkIfValid()) count++;
  }

  return count;
}

const cases = [
  generateTestPair(
    [
      // want
      ['banana', 'apple', 'rice', 'pork', 'pot'],
      // number
      [3, 2, 2, 2, 1],
      // discount
      [
        'chicken',
        'apple',
        'apple',
        'banana',
        'rice',
        'apple',
        'pork',
        'banana',
        'pork',
        'rice',
        'pot',
        'banana',
        'apple',
        'banana',
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

cases.forEach(({ input, output }, i) => {
  const solResult = solution(...input) === output ? '통과' : '실패';
  const refResult = reference(...input) === output ? '통과' : '실패';
  console.log(`${i + 1}번 테스트, solution ${solResult}, reference ${refResult}`);
});
