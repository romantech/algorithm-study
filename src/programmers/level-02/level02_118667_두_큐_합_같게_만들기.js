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
 * 한쪽 큐를 윈도우로 설정해서 left/right를 조정하는 방식으로 목표 값을 찾음
 *
 * 슬라이딩 윈도우(queue1의 윈도우)를 활용한 해결 과정 (1)
 *
 * [3, 2, 7, 2, 4, 6, 5, 1] 절반값 15
 *  |        |              -> 14 < 15 -> right + 1 (q2 빼서 q1에 추가)
 *  |           |           -> 18 > 15 ->  left + 1 (q1 빼서 q2에 추가)
 *     |        |           -> 15 일치
 *
 *
 * 슬라이딩 윈도우(queue1의 윈도우)를 활용한 해결 과정 (2)
 *
 * [1, 2, 1, 2, 1, 10, 1, 2] 절반값 10
 *  |        |              -> 6 < 10  -> right + 1
 *  |           |           -> 7 < 10  -> right + 1
 *  |               |       -> 17 > 10 ->  left + 1
 *     |            |       -> 16 > 10 ->  left + 1
 *        |         |       -> 14 > 10 ->  left + 1
 *           |      |       -> 13 > 10 ->  left + 1
 *              |   |       -> 11 > 10 ->  left + 1
 *                  |       -> 10 일치
 *
 * 슬라이딩 윈도우(queue1의 윈도우)를 활용한 해결 과정 (3)
 * [1, 1, 1, 5] 절반값 4
 *  |  |       -> 2 < 4 -> right + 1 -> l0 r2
 *  |     |    -> 3 < 4 -> right + 1 -> l0 r3
 *  |        | -> 8 > 4 -> left  + 1 -> l1 r3
 *     |     | -> 7 > 4 -> left  + 1 -> l2 r3
 *        |  | -> 6 > 4 -> left  + 1 -> l3 r3
 *           | -> 5 > 4 -> left  + 1 -> l4 r3 -> l4 > queue.length 반복 종료
 *
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

const res = solution(...cases[1].input);
console.log(res);
