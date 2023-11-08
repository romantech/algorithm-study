/**
 * 요구사항
 * 마을의 개수 N, 각 마을을 연결하는 도로의 정보 road, 음식 배달이 가능한 시간 K
 * 1번 마을에 있는 음식점이 K 이하의 시간에 배달할 수 있는 마을의 개수 반환
 * 마을의 개수 N: 1 <= N <= 50
 * 도로 정보 road: [[a, b, c], [...]]
 * a, b는 두 마을의 번호, c는 두 마을의 거리
 * a, b를 연결하는 도로는 여러개 있을 수 있음
 * 임의의 두 마을간엔 항상 이동할 수 있는 경로가 존재함
 * 배달 가능한 시간: 1 <= K <= 500,000
 */

/**
 * 예시 1
 * N = 5, road = [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], K = 3
 *
 * road를 인접리스트로 나타내면...
 * 1: [{to: 2, weight: 1}, {to: 4, weight: 2}]
 * 2: [{to: 1, weight: 1}, {to: 3, weight: 3}, {to: 5, weight: 2}]
 * 3: [{to: 2, weight: 3}, {to: 5, weight: 1}]
 * 4: [{to: 1, weight: 2}, {to: 5, weight: 2}]
 * 5: [{to: 2, weight: 2}, {to: 3, weight: 1}, {to: 4, weight: 2}]
 *
 * 1번 마을 : 0
 * 2번 마을 : 1
 * 3번 마을 : 4 -> (1번에서 2번 마을 1) + (2번에서 3번 마을 3) = 4
 * 4번 마을 : 2
 * 5번 마을 : 3 -> (1에서 2번 마을 1) + (5에서 2번 마을 3) = 3
 * 거리 3이하 마을 [1, 2, 4, 5] -> 4
 */

/**
 * 예시 2
 * N = 6, road = [[1,2,1],[1,3,2],[2,3,2],[3,4,3],[3,5,2],[3,5,3],[5,6,1]], K = 4
 *
 * road를 인접리스트로 나타내면...
 * 1: [{to: 2, weight: 1}, {to: 3, weight: 2}]
 * 2: [{to: 1, weight: 1}, {to: 3, weight: 2}]
 * 3: [{to: 1, weight: 2}, {to: 2, weight: 2}, {to: 4, weight: 3}, {to: 5, weight: 2}, {to: 5, weight: 3}]
 * 4: [{to: 3, weight: 3}]
 * 5: [{to: 3, weight: 2}, {to: 3, weight: 3}, {to: 6, weight: 1}]
 * 6: [{to: 5, weight: 1}]
 *
 * 1번 마을 : 0
 * 2번 마을 : 1
 * 3번 마을 : 2
 * 4번 마을 : 2 + 3 = 5
 * 5번 마을 : 2 + 2 = 4
 * 6번 마을 : 4 + 1 = 5
 * 거리 4이하 마을 [1, 2, 3, 5] -> 4
 */

function solution(N, road, K) {
  // 1부터 N까지 번호를 매기므로 인덱스 0은 무시하기 위해 length: N + 1
  const graph = Array.from({ length: N + 1 }, () => []);
  // road에 대한 인접리스트 생성
  // 인접리스트는 그래프의 각 정점에 대해, 해당 정점에 인접한 정점들의 목록을 리스트로 표현한 자료구조
  // [[], [{ to: 2, weight: 1 }, { to: 4, weight: 2 }], ...]
  road.forEach(([a, b, c]) => {
    graph[a].push({ to: b, weight: c });
    graph[b].push({ to: a, weight: c });
  });

  // 하나의 시작점부터 다른 모든 정점까지의 최단 거리를 구하는 다익스트라 알고리즘 활용
  const queue = [{ to: 1, weight: 0 }]; // 탐색할 정점 목록
  const distances = Array(N + 1).fill(Infinity); // 최단 경로 목록
  // 1번은 출발 지점이므로 0으로 처리 [ Infinity, 0, Infinity, Infinity, Infinity, Infinity ]
  distances[1] = 0;

  while (queue.length > 0) {
    const { to: current, weight: currentWeight } = queue.shift();
    graph[current].forEach(next => {
      if (distances[next.to] > currentWeight + next.weight) {
        distances[next.to] = currentWeight + next.weight;
        // 최소 거리로 업데이트 되는 노드만 queue에 추가
        queue.push({ to: next.to, weight: distances[next.to] });
      }
    });
  }

  // 최단 거리가 K 이하인 마을의 수 계산
  return distances.filter(distance => distance <= K).length;
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

console.log(solution(...cases[0].input));
