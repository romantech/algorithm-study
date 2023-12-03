import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 갈색 격자 수 brown, 노란색 격자 수 yellow가 주어질 때 카펫의 가로, 세로를 배열에 담아서 리턴
 * [매개변수]
 * brown: 8 이상 5000이하 자연수
 * yellow: 1 이상 2000000이하 자연수
 * 카펫의 가로 길이는 세로 길이와 같거나 김
 *
 * [해결방법]
 * 노란색 타일의 높이를 1씩 증가하면서 각 높이에 대한 너비를 계산하고 (yellow / 높이)
 * 해당 너비와 높이로 이루어진 노란색 영역에서 필요한 갈색 타일의 총 개수 계산
 * 계산한 갈색 타일의 총 개수가 인자로 받은 brown과 동일하다면 노란색 타일을 감싼 형태로 볼 수 있음
 * 갈색 타일의 위/아래 너비 = (노란색 영역 너비 + 2) * 2
 * 갈색 타일의 좌/우 높이 = 노란색 영역 높이 * 2
 */

const getBrownTotal = (yellowWidth, yellowHeight) => {
  const w = (yellowWidth + 2) * 2;
  const h = yellowHeight * 2;

  return w + h;
};

function solution(brown, yellow) {
  let yellowHeight = 0;
  let yellowWidth = 0;

  while (yellowHeight < yellow) {
    yellowHeight++;
    yellowWidth = Math.ceil(yellow / yellowHeight);

    if (getBrownTotal(yellowWidth, yellowHeight) === brown) break;
  }

  return [yellowWidth + 2, yellowHeight + 2];
}

const cases = [
  generateTestPair([10, 2], [4, 3]), // [brown, yellow], [x, y]
  generateTestPair([8, 1], [3, 3]),
  generateTestPair([24, 24], [8, 6]),
];

cases.forEach(({ input, output }) => {
  const result = solution(...input);
  console.log(result.every((el, i) => el === output[i]));
});
