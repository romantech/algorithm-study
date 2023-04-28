// 재료 배열을 받아 완성할 수 있는 햄버거 개수 반환
// 1,2,3은 각각 빵, 야채, 고기. 1개 완성된 햄버거는 1,2,3,1로 구성

function solution1(ingredient) {
  const temp = [];
  let result = 0;
  for (const i of ingredient) {
    temp.push(i);
    if (temp.slice(-4).join('') === '1231') {
      result += 1;
      temp.splice(-4);
    }
  }
  return result;
}

// 1번보다 속도 느림
function solution2(ingredient) {
  let result = 0;
  let rest = ingredient.join('');
  const re = /(1231)/;

  while (re.test(rest)) {
    result += 1;
    rest = rest.replace(re, '');
  }

  return result;
}

const cases = [
  { input: [2, 1, 1, 2, 3, 1, 2, 3, 1], output: 2 },
  {
    input: [1, 3, 2, 1, 2, 1, 3, 1, 2],
    output: 0,
  },
  { input: [1, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 1], output: 3 },
];

solution1(cases[2].input);
