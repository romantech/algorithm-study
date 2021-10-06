/* eslint-disable */
// * 참고
// 
// board 배열은 2차원 배열 크기로 5*5 이상 30*30 이하
// board 각 칸에는 0 이상 100이하 정수
  // 0은 빈칸을 나타냄
  // 1~100의 각 숫자는 다른 인형 모양을 의미하며, 숫자 같으면 인형 모양도 같음
// moves 배열 크기는 1이상 1000이하
// moves 배열 각 원소들의 값은 1이상, board 배열의 가로 크기 이하인 자연수
// 바구니 배열의 길이 제한은 없으며 stack 형태로 쌓임. 
// 바구니에 쌓인 인형중 연속적으로 같은 숫자(인형)이면 사라지고 count + 2
/* eslint-enable */

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

const board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];
const moves = [1, 5, 3, 5, 1, 2, 1, 4];
solution(board, moves);
