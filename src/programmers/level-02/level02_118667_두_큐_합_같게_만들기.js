import { generateTestPair } from '../../utils.js';

/**
 * 길이가 같은 두 개의 큐가 주어지고, 하나의 큐를 골라 요소를 pop하고(첫번째 요소 추출),
 * 추출된 원소를 다른 큐에 insert(마지막 요소로 추가) 작업을 통해 각 큐의 원소 합이 같아지게 만드려고 함
 * 이때 필요한 작업의 최소 횟수를 구하고자 함
 * 한 번의 pop과 한 번의 insert를 합쳐서 작업을 1회 수행한 것으로 간주
 * 만약 어떠한 방법으로도 각 큐의 원소 합을 같게 만들 수 없는 경우 -1 반환
 *
 * 예를들어 queue1=[3,2,7,2], queue2=[4,6,5,1] 일 때
 * 두 큐에 있는 요소의 총 합은 30이므로 각 큐의 합을 15로 만들어야 함
 *
 * queue1 추출 -> q1[2,7,2], q2[4,6,5,1,3] (x)
 * queue2 추출 -> q1[2,7,2,4], q2[6,5,1,3] (o)
 * 작업 2회에 각 큐의 합이 갖도록 만들었으므로 2 반환
 * */

function solution(queue1, queue2) {
  const answer = -2;
  return answer;
}

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
