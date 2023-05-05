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
