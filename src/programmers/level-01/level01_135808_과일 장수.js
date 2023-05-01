// 한 상자에 사과 m개씩 담아 포장
// 사과는 1점 ~ k점으로 분류
// 상자에 담긴 사과 중 가장 낮은 점수가 p
// 사과 한 상자 가격은 p * m
// 사과는 상자 단위로만 판매, 남는 사과는 버림
// 최저 사과 점수 x 한 상자에 담긴 사과 개수 x 상자 개수 = 최대 이익

function solution(_, m, score) {
  const sorted = score.sort((a, b) => b - a);
  // {n} 수량자에 변수 사용하기 위해 RegExp 생성자 함수 사용
  // RegExp 생성자에서 기호는 \ 백슬래시 사용해 이스케이프 필요
  const re = new RegExp(`\\d{${m}}`, 'g');
  const inBox = sorted.join('').match(re) ?? [];
  return inBox.reduce((result, box) => result + box.at(-1) * m, 0);
}

const cases = [
  { input: [3, 4, [1, 2, 3, 1, 2, 3, 1]], output: 8 },
  { input: [4, 3, [4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2]], output: 33 },
];

solution(...cases[0].input);
