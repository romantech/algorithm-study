import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 의상이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합 수 반환
 * - 각 종류별로 최대 1가지 의상만 착용 가능
 * - 착용한 의상의 일부가 겹치더라도, 다른 의상이 겹치지 않으면 다른 방법으로 옷을 착용한 것으로 계산
 * - 하루에 최소 1개 이상의 의상 착용
 *
 * [파라미터]
 * clothes : [[의상_이름, 의상_종류], [의상_이름, 의상_종류], [...]]
 * 의상 수는 1개 이상 30개 이하
 *
 * [예제]
 * clothes: [["yellow_hat", "headgear"], ["blue_sunglasses", "eyewear"], ["green_turban", "headgear"]]
 *
 * headgear: yellow_hat, green_turban
 * eyewear: blue_sunglasses
 * - headgear를 선택하는 경우의 수 = 2
 * - eyewear를 선택하는 경우의 = 1
 * - headgear + eyewear 조합으로 선택하는 경우의 수 = 2 * 1 = 2
 * - 전체 경우의 수 = 2 + 1 + 2 = 5
 *
 * [참고]
 * 각 단계의 선택지가 독립적일 때 각 단계의 선택지 수를 곱해서 경우의 수를 계산할 수 있다(곱셈 원칙)
 * 예를들어 식당에서 메인 요리 선택지가 3가지, 음료에 대한 선택지가 2가지일 때 가능한 경우의 수는 3 * 2 = 6이 된다.
 *
 * 만약 여러 선택지 중 하나만 선택해야할 땐 각 선택지의 가능한 경우의 수를 모두 더한다(덧셈 원칙)
 * 예를들어 식당에서 메인 요리로 피자(3가지) 혹은 파스타(2가지) 중 하나만 선택할 수 있다면 가능한 경우의 수는 3 + 2 = 5가 된다
 */

function solution(clothes) {
  const answer = 0;
  return answer;
}

const cases = [
  generateTestPair(
    [
      [
        ['yellow_hat', 'headgear'],
        ['blue_sunglasses', 'eyewear'],
        ['green_turban', 'headgear'],
      ],
    ],
    5,
  ),
  generateTestPair(
    [
      [
        ['crow_mask', 'face'],
        ['blue_sunglasses', 'face'],
        ['smoky_makeup', 'face'],
      ],
    ],
    5,
  ),
];

console.log(solution(...cases[0].input));
