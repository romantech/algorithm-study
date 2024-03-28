import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 각 기능은 진도가 100%일 때 서비스에 반영 가능
 * 각 기능의 개발 속도가 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발 될 수 있음
 * 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됨
 *
 * [매개변수]
 * progresses: 배포 순서대로 작업의 진도가 적힌 100개 이하 배열. 각 요소는 100 미만 자연수
 * speeds : 개발 속도가 담긴 배열(하루 기준). 각 요소는 100 이하 자연수
 * 배포는 하루에 한 번만 가능. e.g. 진도율 95%인 작업의 개발 속도가 하루 4%라면 배포는 2일 뒤
 *
 * [예시]
 * progresses [93, 30, 55], speeds [1, 30, 5]
 * 첫번째 기능 : 하루에 1%씩 작업하므로 7일간 작업 후 배포 가능 (93 + (1 * 7))
 * 두번째 기능 : 하루에 30%씩 작업하므로 3일간 작업 후 배포 가능 (30+ (30 * 3))
 * 세번째 기능 : 하루에 5%씩 작업하므로 9일간 작업 후 배포 가능 (55 + (5 * 9))
 * 따라서 7일째 2개 기능(1~2), 9일째 1개 기능(3) 배포 -> return [2, 1]
 */

// 100 - 93 = 7, ceil(7 / 1) -> 7
// 100 - 30 = 70, ceil(70 / 30) -> 3
// 100 - 55 = 45, ceil(45 / 5) -> 9
// [3, 7, 9]

function solution(progresses, speeds) {
  const daysToComplete = progresses.map((p, i) => Math.ceil((100 - p) / speeds[i]));

  let last = daysToComplete[0];
  const result = [1];

  for (let i = 1; i < daysToComplete.length; i += 1) {
    const current = daysToComplete[i];

    if (current <= last) {
      result[result.length - 1] += 1;
    } else {
      result.push(1);
      last = current;
    }
  }

  return result;
}

const cases = [
  generateTestPair(
    [
      [93, 30, 55],
      [1, 30, 5],
    ],
    [2, 1],
  ),
  generateTestPair(
    [
      [95, 90, 99, 99, 80, 99],
      [1, 1, 1, 1, 1, 1],
    ],
    [1, 3, 2],
  ),
];

console.log(solution(...cases[1].input));
