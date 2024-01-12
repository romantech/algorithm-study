import { generateTestPair } from '../../utils.js';

/*
 * [요구사항]
 * 운영체제가 아래 규칙에 따라 프로세스를 관리할 때 특정 프로세스가 몇 번째로 실행되는지 확인
 * 1. 실행 대기 큐에서 대기중인 프로세스를 꺼낸다
 * 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있으면 방금 꺼낸 프로세스를 다시 큐에 넣는다
 * 3. 만약 우선순위가 더 높은 프로세스가 없다면 방금 큐에서 꺼낸 프로세스를 실행한다
 * 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료한다
 *
 * [예시]
 * [A, B, C, D] 프로세스의 우선순위가 [2, 1, 3, 2]라면...
 * A 꺼내고 다시 집어넣음 [B1, C3, D2, A2]
 * B 꺼내고 다시 집어넣음 [C3, D2, A2, B1]
 * C 실행 [D2, A2, B1] -> D 실행 [A2, B1] -> A 실행 -> B 실행
 *
 * [파라미터]
 * priorities: 중요도가 담긴 배열. 1 이상 100이하, 각 원소는 1 이상 9 이하, 숫자 높을 수록 우선순위 높음
 * location: 몇 번째로 실행되는지 알고싶은 프로세스의 위치. 0이상 priorities 배열 길이 이하
 * */

function solution(priorities, location) {
  const queue = priorities.map((priority, index) => ({ priority, index }));
  const sortedPriorities = priorities.sort((a, b) => b - a);

  let seq = 0;

  while (queue.length > 0) {
    const cur = queue.shift();
    const [maxPriority] = sortedPriorities;

    if (cur.priority >= maxPriority) {
      seq++;
      if (maxPriority === cur.priority) sortedPriorities.shift();
      if (cur.index === location) break;
    } else {
      queue.push(cur);
    }
  }

  return seq;
}

const cases = [
  generateTestPair([[2, 1, 3, 2], 2], 1),
  generateTestPair([[1, 1, 9, 1, 1, 1], 0], 5),
];

console.log(solution(...cases[1].input));
