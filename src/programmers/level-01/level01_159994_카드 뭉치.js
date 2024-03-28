// cards1과 cards2를 조합하여 goal과 동일하게 만들 수 있는지 여부를 반환하는 함수
// cards1, 2의 단어 순서는 바꿀 수 없음

const cases = [
  {
    input: [
      ['i', 'drink', 'water'], // cards1
      ['want', 'to'], // cards2
      ['i', 'want', 'to', 'drink', 'water'], // goal
    ],
    output: 'Yes',
  },
  {
    input: [
      ['i', 'water', 'drink'], // cards1
      ['want', 'to'], // cards2
      ['i', 'want', 'to', 'drink', 'water'], // goal
    ],
    output: 'No',
  },
];

function solution(cards1, cards2, goal) {
  const checker = (cardArray, cardStr) => {
    if (cardArray[0] === cardStr) {
      cardArray.shift();
      return true;
    }
    return false;
  };

  const result = goal.filter(card => {
    return checker(cards1, card) || checker(cards2, card);
  });

  return result.length === goal.length ? 'Yes' : 'No';
}

solution(...cases[0].input);

// 레퍼런스
function solution2(cards1, cards2, goal) {
  let j = 0;
  let k = 0;
  for (let i = 0; i < goal.length; i++) {
    if (goal[i] === cards1[j])
      j++; // i(1) > drink(2) > water(3)
    else if (goal[i] === cards2[k])
      k++; // want(1) > to(2)
    else return 'No';
  }
  return 'Yes';
}

solution2(...cases[0].input);
