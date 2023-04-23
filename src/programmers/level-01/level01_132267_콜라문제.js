// a : 필요한 콜라병
// b : a개 전달시 받을 수 있는 콜라병 수
// n : 보유한 콜라 병
// ex) a = 2, b = 1, n = 20
// 20 / 2 = 10
// 10 / 2 = 5
// 5 / 2 = 2 (1)
// 3 / 2 = 1 (1)
// 2 / 2 = 1
// 19

// ex) a = 3, b = 1, n = 20
// 20 / 3 = 6 (2)
// 8 / 3 = 2 (2)
// 4 / 3 = 1
// 9
function solution(a, b, n) {
  let result = 0;
  let rest = n;

  while (rest >= a) {
    const exchanged = parseInt(rest / a, 10) * b;
    rest = exchanged + (rest % a);
    result += exchanged;
  }

  return result;
}

const cases = [
  { input: [2, 1, 20], answer: 19 },
  { input: [3, 1, 20], answer: 9 },
];

solution(...cases[1].input);
