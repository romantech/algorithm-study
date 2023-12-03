/* eslint-disable consistent-return */

import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 갈색 타일 수 brown, 노란색 타일 수 yellow가 주어질 때 카펫의 가로, 세로를 배열에 담아서 리턴
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

function reference(brown, yellow) {
  const total = brown + yellow; // 전체 타일의 개수 = 가로 * 세로

  /**
   * 문제에서 brown의 최소 값은 8이므로 최소 높이는 3
   * b b b
   * b Y b
   * b b b
   * 가로, 세로 길이는 전체 타일 개수의 약수에서 찾을 수 있음
   * 예를들어 전체 타일의 수가 12라면 약수 1, 2, 3, 4, 6, 12 중에서 4(가로)와 3(세로)을 곱하면 됨
   *
   * Math.sqrt(total) 조건을 주는 이유:
   * 문제에서 세로는 가로보다 클 수 없기 때문에, 세로는 항상 가로의 최대값인, 전체 타일 수의 제곱근 이하의 수가 됨
   * 예를들어 가로 4, 세로 3, 전체 타일 수 12에서 세로 길이 3은 전체 타일의 제곱근 3.46... 보다 같거나 작음
   * 또한, 제곱근 이후부터 이미 계산했던 약수를 중복해서 계산하므로 제곱근 이후부턴 계산할 필요 없음
   */

  for (let height = 3; height <= Math.sqrt(total); height++) {
    // 높이가 전체 타일 개수의 약수라면
    if (total % height === 0) {
      const width = total / height; // total = width * height 이므로 width = total / height
      /**
       * 노란색 타일 너비 = 갈색 타일 너비 - 2, 노란색 타일 높이 = 갈색 타일 높이 - 2
       * 예를들어 갈색 타일의 가로/세로가 각각 4, 3이면, 노란색 타일의 가로는 2(4-2), 1(3-2) 이 됨
       * b b b b
       * b Y Y b
       * b b b b
       *
       */
      if ((width - 2) * (height - 2) === yellow) {
        return [width, height];
      }
    }
  }
}

const cases = [
  generateTestPair([10, 2], [4, 3]), // [brown, yellow], [x, y]
  generateTestPair([8, 1], [3, 3]),
  generateTestPair([24, 24], [8, 6]),
];

cases.forEach(({ input, output }) => {
  console.log(solution(...input).every((el, i) => el === output[i]));
  console.log(reference(...input).every((el, i) => el === output[i]));
});
