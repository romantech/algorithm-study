/* eslint-disable no-continue */

/**
 * [요구사항]
 * 마을의 개수 N, 각 마을을 연결하는 도로의 정보 road, 음식 배달이 가능한 시간 K
 * 1번 마을에 있는 음식점이 K 이하의 시간에 배달할 수 있는 마을의 개수 반환
 * 마을의 개수 N: 1 <= N <= 50
 * 도로 정보 road: [[a, b, c], [...]]
 * a, b는 두 마을의 번호, c는 두 마을의 거리
 * a, b를 연결하는 도로는 여러개 있을 수 있음
 * 임의의 두 마을간엔 항상 이동할 수 있는 경로가 존재함
 * 배달 가능한 시간: 1 <= K <= 500,000
 *
 * [풀이방법]
 * 하나의 시작점부터 다른 모든 정점까지의 최단 거리를 구하는 다익스트라 알고리즘 활용
 */

/**
 * [예시 1]
 * N = 5, road = [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], K = 3

 * road를 인접리스트로 나타내면...
 * 1: [{node: 2, dist: 1}, {node: 4, dist: 2}]
 * 2: [{node: 1, dist: 1}, {node: 3, dist: 3}, {node: 5, dist: 2}]
 * 3: [{node: 2, dist: 3}, {node: 5, dist: 1}]
 * 4: [{node: 1, dist: 2}, {node: 5, dist: 2}]
 * 5: [{node: 2, dist: 2}, {node: 3, dist: 1}, {node: 4, dist: 2}]
 *
 * 1번 마을 : 0
 * 2번 마을 : 1
 * 3번 마을 : 4 -> (1번에서 2번 마을 1) + (2번에서 3번 마을 3) = 4
 * 4번 마을 : 2
 * 5번 마을 : 3 -> (1에서 2번 마을 1) + (5에서 2번 마을 3) = 3
 * 거리 3이하 마을 [1, 2, 4, 5] -> 4
 *
 *
 * [예시 2]
 * N = 6, road = [[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]], K = 4
 *
 * road를 인접리스트로 나타내면...
 * 1: [{node: 2, dist: 1}, {node: 3, dist: 2}]
 * 2: [{node: 1, dist: 1}, {node: 3, dist: 2}]
 * 3: [{node: 1, dist: 2}, {node: 2, dist: 2}, {node: 4, dist: 3}, {node: 5, dist: 2}, {node: 5, dist: 3}]
 * 4: [{node: 3, dist: 3}]
 * 5: [{node: 3, dist: 2}, {node: 3, dist: 3}, {node: 6, dist: 1}]
 * 6: [{node: 5, dist: 1}]
 *
 * 1번 마을 : 0
 * 2번 마을 : 1
 * 3번 마을 : 2
 * 4번 마을 : 2 + 3 = 5
 * 5번 마을 : 2 + 2 = 4
 * 6번 마을 : 4 + 1 = 5
 * 거리 4이하 마을 [1, 2, 3, 5] -> 4
 */

/**
 * 큐에 노드를 추가할 때마다 우선순위가 높은 노드가 항상 앞으로 감
 * 노드를 추가할 때마다 모든 요소를 순회하므로 비효율적임.
 * 힙(Heap)을 이용해 구현하는게 효율 훨씬 좋음
 */
class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  enqueue(node, priority) {
    this.nodes.push({ node, priority });
    this.sort();
  }

  dequeue() {
    return this.nodes.shift();
  }

  sort() {
    this.nodes.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.nodes.length === 0;
  }
}

const createGraph = (N, road) => {
  // 1부터 N까지 번호를 매기므로 인덱스 0은 무시하기 위해 length: N + 1
  const graph = Array.from({ length: N + 1 }, () => []);
  // road에 대한 인접리스트(그래프의 각 정점 접해있는 정점들을 리스트로 표현한 자료구조) 생성
  // [[], [{ node: 2, dist: 1 }, { node: 4, dist: 2 }], ...]
  road.forEach(([a, b, c]) => {
    graph[a].push({ node: b, dist: c });
    graph[b].push({ node: a, dist: c });
  });

  return graph;
};

const dijkstraBasic = (N, graph, start) => {
  const distances = Array(N + 1).fill(Number.MAX_SAFE_INTEGER); // 최단 경로 목록
  const queue = [{ node: 1, dist: 0 }]; // 탐색할 정점 목록

  distances[start] = 0; // 1번은 출발 지점이므로 0으로 처리 [ Max, 0, Max, Max, Max, Max ]

  while (queue.length > 0) {
    const { node: currentNode, dist: currentDist } = queue.shift();
    if (distances[currentNode] < currentDist) continue; // 현재 노드의 최단 거리를 이미 계산했다면 건너뛰기

    graph[currentNode].forEach(({ node: nextNode, dist: nextDist }) => {
      const newDist = currentDist + nextDist;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        queue.push({ node: nextNode, dist: newDist }); // 최소 거리로 업데이트 되는 노드만 queue에 추가
      }
    });
  }
  return distances;
};

const dijkstraEnhanced = (N, graph, start) => {
  const distances = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  const queue = new PriorityQueue();

  distances[start] = 0;
  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const { node: currentNode, priority: currentDist } = queue.dequeue();
    if (distances[currentNode] < currentDist) continue;

    graph[currentNode].forEach(({ node: nextNode, dist: nextDist }) => {
      const newDist = currentDist + nextDist;
      if (newDist < distances[nextNode]) {
        distances[nextNode] = newDist;
        queue.enqueue(nextNode, newDist);
      }
    });
  }
  return distances;
};

function solution(N, road, K) {
  const graph = createGraph(N, road);
  const distances = dijkstraEnhanced(N, graph, 1);
  return distances.filter(distance => distance <= K).length; // 최단 거리가 K 이하인 마을의 수 계산
}

const cases = [
  {
    input: [
      5, // N
      [
        [1, 2, 1],
        [2, 3, 3],
        [5, 2, 2],
        [1, 4, 2],
        [5, 3, 1],
        [5, 4, 2],
      ], // road
      3, // K
    ],
    output: 4,
  },
  {
    input: [
      6, // N
      [
        [1, 2, 1],
        [1, 3, 2],
        [2, 3, 2],
        [3, 4, 3],
        [3, 5, 2],
        [3, 5, 3],
        [5, 6, 1],
      ], // road
      4, // K
    ],
    output: 4,
  },
];

console.log(solution(...cases[1].input));
