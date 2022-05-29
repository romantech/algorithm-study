// 원래 이용료 price
// 놀이기구를 N번째 이용한다면 이용료 N배 받음
// 놀이기구를 count번 타면 현재 가지고 있는 금액(money)에서 얼마나 모자라는지 return

function solution1(price, money, count) {
  let sum = 0;
  for (let i = 1; i <= count; i += 1) {
    sum += price * i;
  }

  return sum <= money ? 0 : sum - money;
}

// * 레퍼런스
// 1~100까지 모든 수를 더할 때 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101... 모두 101이 나온다.
// ...50 + 51까지 계속 반복하면 총 50회. 즉 101 * 50이 1~100까지 모든 수의 합. 이것이 가우스 공식
// 101(n+1)을 50(n/2)으로 곱하면 1~100까지의 모든 합이 된다. (n + 1) * (n / 2)
// 혹은 101(n+1) * 100번(n) / 2로 해도 동일하다 ((n + 1) * n) / 2
// 참고 링크 : https://www.joongang.co.kr/article/13396918
function solution2(price, money, count) {
  const tmp = (price * count * (count + 1)) / 2 - money;
  // n = count
  // (count + 1) * count / 2 여기에 price를 곱하면 1~4 카운트까지의 최대 금액이 된다.

  // (price * count) + price는 항상 동일한 숫자이므로 (12 + 3 = 15, 6 + 9 = 15)
  // 이렇게 계산해도 됨 (price + (price * count)) * (count / 2)
  return tmp > 0 ? tmp : 0;
}

const case1 = {
  price: 3,
  money: 20,
  count: 4,
}; // 3 + 6 + 9 + 12 = 30 원래 머니 20보다 10부족

solution1(case1.price, case1.money, case1.count); /* ? */
