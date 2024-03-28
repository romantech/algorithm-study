/* eslint-disable */
// * 문제 설명
// board 배열은 2차원 배열 크기로 5*5 이상 30*30 이하
// board 각 칸에는 0 이상 100이하 정수
// 0은 빈칸을 나타냄
// 1~100의 각 숫자는 다른 인형 모양을 의미하며, 숫자 같으면 인형 모양도 같음
// moves 배열 크기는 1이상 1000이하
// moves 배열 각 원소들의 값은 1이상, board 배열의 가로 크기 이하인 자연수
// 바구니 배열의 길이 제한은 없으며 stack 형태로 쌓임.
// 바구니에 쌓인 인형중 연속적으로 같은 숫자(인형)이면 사라지고 count + 2
/* eslint-enable */

// eslint-disable-next-line no-unused-vars
function solution(board, moves) {
  // moves 순회
  // moves 현재 요소의 숫자를 board의 인덱스로 검사

  const matchedArr = [];
  let count = 0;

  const checkArr = () => {
    const len = matchedArr.length;

    if (len === 0 || matchedArr[len - 1] !== matchedArr[len - 2]) {
      return;
    }

    if (matchedArr[len - 1] === matchedArr[len - 2]) {
      matchedArr.pop();
      matchedArr.pop();
      count += 2;
      checkArr();
    }
  };

  for (let i = 0; i < moves.length; i += 1) {
    for (let j = 0; j < board.length; j += 1) {
      if (board[j][moves[i] - 1] !== 0) {
        matchedArr.push(board[j][moves[i] - 1]);
        board[j][moves[i] - 1] = 0;
        checkArr();
        break;
      }
    }
  }

  return count;
}

// * 레퍼런스
/* eslint-disable */
// moves의 각 요소 숫자는 board의 column (인덱스 - 1) 기준으로 접근한다
// board에서 모든 0을 제거하고
// board를 column 기준으로 배열을 나누고, 가장 낮은 row 인덱스 순으로 요소를 정렬하면
// [3, 4], [5, 2, 2], [1, 4, 5, 1], [3, 4], [1, 2, 1, 3] 이런 모양이 된다
// moves가 1이면 (1 - 1)번 컬럼인 [3, 4], moves가 2면 (2 -1)번 컬럼 배열에 접근한 후
// 해당 배열의 마지막 요소 pop
// pop한 요소 숫자와 basket 배열의 마지막 요소가 같지 않으면, pop한 숫자는 basket 배열에 push
// 같다면 basket 배열의 마지막 요소를 pop하고
// result + 2
/* eslint-enable */
const transpose = matrix =>
  matrix.reduce((result, row) => row.map((_, i) => [...(result[i] || []), row[i]]), []);

/* transpose 함수를 거친 후 배열
  [
    [0, 0, 0, 4, 3],
    [0, 0, 2, 2, 5],
    [0, 1, 5, 4, 1],
    [0, 0, 0, 4, 3],
    [0, 3, 1, 2, 1],
  ];
*/

/* eslint-disable no-continue */
const solution2 = (board, moves) => {
  const stacks = transpose(board).map(row => row.reverse().filter(el => el !== 0));

  /* stacks 배열
  [
    [3, 4],
    [5, 2, 2],
    [1, 4, 5, 1],
    [3, 4],
    [1, 2, 1, 3],
  ];
  */

  const basket = [];
  let result = 0;

  for (const move of moves) {
    const pop = stacks[move - 1].pop();
    if (!pop) continue;
    if (pop === basket[basket.length - 1]) {
      basket.pop();
      result += 2;
      continue;
    }
    basket.push(pop);
  }

  return result;
};

const board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];
const moves = [1, 5, 3, 5, 1, 2, 1, 4];
solution2(board, moves);
