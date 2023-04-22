// X, Y 숫자(문자열)를 받아 공통 숫자로 만들 수 있는 가장 큰 수 반환
// 문자열로 반환
// X, Y는 0으로 시작하지 않음
// 3 <= X
// Y 길이 <= 3,000,000
// 짝꿍이 존재하지 않으면 -1 반환
// X: '100', Y: '2045 = '-1'
// X: '100', Y: '203045' = '0'
// X: '12321', 'Y': '42531' = '321'

// X, Y 각각 중복 숫자가 몇개 있는지 확인한다
// 9부터 1까지 숫자에 대해 X, Y를 비교하여 더 적은 중복 개수를 가진 값을 반환한다
// ex) X: '12321', Y: '42531'
// 숫자 1 중복 개수 : X 2개, Y 1개 -> Y의 중복 개수가 더 적으므로 '1'.repeat(1)
// 숫자 4 중복 개수 : X 0개, Y 1개 -> X의 중복 개수가 더 적으므로 '0'.repeat(0) -> 반복 안함

function solution(X, Y) {
  const xMap = {};
  const yMap = {};
  const splitedX = X.split('');
  const splitedY = Y.split('');

  let result = '';

  for (let i = 9; i >= 0; i--) {
    xMap[i] = splitedX.filter(x => Number(x) === i).length;
    yMap[i] = splitedY.filter(y => Number(y) === i).length;
  }

  for (let i = 9; i >= 0; i--) {
    const min = Math.min(xMap[i], yMap[i]);
    result += String(i).repeat(min);
  }

  if (!result) return '-1';
  if (Number(result)) return result;
  return '0';
}

console.log(solution('100', '203045'));
