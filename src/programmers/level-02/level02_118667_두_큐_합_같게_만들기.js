import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 길이가 같은 두 개의 큐가 주어지고, 하나의 큐를 골라 요소를 pop하고(첫번째 요소 추출),
 * 추출된 원소를 다른 큐에 insert(마지막 요소로 추가) 작업을 통해 각 큐의 원소 합이 같아지게 만드려고 함
 * 이때 필요한 작업의 최소 횟수를 구하고자 함
 * 한 번의 pop과 한 번의 insert를 합쳐서 작업을 1회 수행한 것으로 간주
 * 만약 어떠한 방법으로도 각 큐의 원소 합을 같게 만들 수 없는 경우 -1 반환
 *
 * 예를들어 queue1=[3,2,7,2], queue2=[4,6,5,1] 일 때
 * 두 큐에 있는 요소의 총 합은 30이므로 각 큐의 합을 15로 만들어야 함
 *
 * queue1 추출 -> q1[2,7,2],   q2[4,6,5,1,3] (x)
 * queue2 추출 -> q1[2,7,2,4], q2[6,5,1,3]   (o)
 * 작업 2회에 각 큐의 합이 갖도록 만들었으므로 2 반환
 *
 * [제한사항]
 * 1 <= queue1.length = queue2.length <= 300,000
 * 1 <= queue1 원소, queue2 원소 <= 10⁹
 * */

const sum = (arr) => arr.reduce((acc, cur) => acc + cur);

function solution(queue1, queue2) {
  const answer = -1;
  const merged = queue1.concat(queue2);
  const mergedSum = sum(merged);

  if (mergedSum % 2 !== 0) return answer;

  const halfSum = mergedSum / 2;
  let left = 0;
  let right = queue1.length;
  let count = 0;
  let windowSum = sum(queue1);

  while (left < merged.length && right < merged.length) {
    if (windowSum === halfSum) return count;

    // queue2 첫번째 요소 빼서 queue1 마지막 요소로 추가
    if (windowSum < halfSum) windowSum += merged[right++];
    // queue1 첫번째 요소 빼소 queue2 마지막 요소로 추가
    else if (windowSum > halfSum) windowSum -= merged[left++];

    count++;
  }

  return answer;
}

/*
 * 한쪽 큐의 합이 두 큐 합의 절반이 되도록 만들면 나머지 큐의 합도 동일해지므로,
 * 한쪽 큐를 윈도우로 설정해서 left/right를 조정하는 방식으로 목표 값 탐색
 *
 * 슬라이딩 (큐1)윈도우를 활용한 해결 과정 (1)
 * [3, 2, 7, 2, 4, 6, 5, 1] 절반값 15
 *  |        |              -> 14 < 15 -> R++ (큐2 요소 빼서 큐1에 추가)
 *  |           |           -> 18 > 15 -> L++ (큐1 요소 빼서 큐2에 추가)
 *     |        |           -> 15 일치
 *
 *
 * 슬라이딩 (큐1)윈도우를 활용한 해결 과정 (2)
 * [1, 2, 1, 2, 1, 10, 1, 2] 절반값 10
 *  |        |              -> 6  < 10 -> R++ (L0 R4)
 *  |           |           -> 7  < 10 -> R++ (L0 R5)
 *  |               |       -> 17 > 10 -> L++ (L1 R5)
 *     |            |       -> 16 > 10 -> L++ (L2 R5)
 *        |         |       -> 14 > 10 -> L++ (L3 R5)
 *           |      |       -> 13 > 10 -> L++ (L4 R5)
 *              |   |       -> 11 > 10 -> L++ (L5 R5)
 *                  |       -> 10 일치 (Queue 1엔 요소 [10] 하나만 남음)
 *
 * 슬라이딩 (큐1)윈도우를 활용한 해결 과정 (3)
 * [1, 1, 1, 5] 절반값 4
 *  |  |       -> 2 < 4 -> R++ (L0 R2)
 *  |     |    -> 3 < 4 -> R++ (L0 R3)
 *  |        | -> 8 > 4 -> R++ (L0 R4)
 *  R4 > merged.length 큐 길이 초과해서 반복 종료
 * */

const cases = [
  generateTestPair(
    [
      [3, 2, 7, 2],
      [4, 6, 5, 1],
    ],
    2,
  ),
  generateTestPair(
    [
      [1, 2, 1, 2],
      [1, 10, 1, 2],
    ],
    7,
  ),
  generateTestPair(
    [
      [1, 1],
      [1, 5],
    ],
    -1,
  ),
];

cases.forEach(({ input, output }, i) => {
  const msg = solution(...input) === output ? '통과' : '실패';
  console.log(`${i + 1}번 테스트 ${msg}`);
});
