import { generateTestPair } from '../../utils.js';

/* eslint-disable camelcase */

/**
 * [요구사항]
 * 트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려고 함
 * 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 함
 * 다리에는 최대 bridge_length대의 트럭이 올라갈 수 있고,
 * 다리는 weight 이하까지 견딜 수 있고, 다리에 완전히 오르지 않은 트럭의 무게는 무시
 * 트럭 순서는 바꿀 수 없음. 각 트럭들은 하나의 단위시간에 하나의 단위길이만큼만 이동 가능
 *
 * [파라미터]
 * bridge_length : 1 이상 10,000 이하
 * weight : 1 이상 10,000 이하
 * truck_weight : 1 이상 10,000 이하, 각 트럭의 무게는 1 이상 weight 이하
 *
 * [예시]
 * 예를들어 트럭 2대가 올라갈 수 있고(bridge_length = 2),
 * 무게를 10kg(weight = 10)까지 견디는 다리가 있음
 * 무게가 [7, 4, 5 ,6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면...
 *
 * 경과시간 0 | 다리를 지난 트럭 [] | 다리를 건너는 트럭 [] | 대기 트럭 [7, 4, 5, 6]
 * 경과시간 1 | 다리를 지난 트럭 [] | 다리를 건너는 트럭 [7] | 대기 트럭 [4, 5, 6]
 * 경과시간 2 | 다리를 지난 트럭 [] | 다리를 건너는 트럭 [7] | 대기 트럭 [4, 5, 6]
 * 경과시간 3 | 다리를 지난 트럭 [7] | 다리를 건너는 트럭 [4] | 대기 트럭 [5, 6]
 * 경과시간 4 | 다리를 지난 트럭 [7] | 다리를 건너는 트럭 [4, 5] | 대기 트럭 [6]
 * 경과시간 5 | 다리를 지난 트럭 [7, 4] | 다리를 건너는 트럭 [5] | 대기 트럭 [6]
 * 경과시간 6 | 다리를 지난 트럭 [7, 4, 5] | 다리를 건너는 트럭 [6] | 대기 트럭 []
 * 경과시간 7 | 다리를 지난 트럭 [7, 4, 5] | 다리를 건너는 트럭 [6] | 대기 트럭 []
 * 경과시간 8 | 다리를 지난 트럭 [7, 4, 5, 6] | 다리를 건너는 트럭 [] | 대기 트럭 []
 */

function solution(bridge_length, weight, truck_weights) {
  let elapsedTime = 0;
  let totalWeightOnBridge = 0;
  const trucksOnBridge = []; // [{ weight, distanceLeft }]

  while (truck_weights.length > 0 || trucksOnBridge.length > 0) {
    elapsedTime++;

    // 다리 위에 있는 트록 앞으로 이동
    trucksOnBridge.forEach(truck => truck.distanceLeft--);

    // 가장 앞에 있는 트럭이 다리를 건넜는지 확인
    if (trucksOnBridge[0]?.distanceLeft === 0) {
      totalWeightOnBridge -= trucksOnBridge.shift().weight;
    }

    // 가능시 새로운 트럭을 다리 위로 이동
    const nextTruckWeight = truck_weights[0];
    if (
      nextTruckWeight &&
      totalWeightOnBridge + nextTruckWeight <= weight &&
      trucksOnBridge.length < bridge_length
    ) {
      trucksOnBridge.push({
        weight: nextTruckWeight,
        distanceLeft: bridge_length,
      });
      totalWeightOnBridge += nextTruckWeight;
      truck_weights.shift();
    }
  }

  return elapsedTime;
}

function reference(bridge_length, weight, truck_weights) {
  let elapsedTime = 0;
  let totalWeightOnBridge = 0;
  const trucksOnBridge = new Array(bridge_length).fill(0); // [0, 0]

  // 대기 트럭이 없어도 다리를 건너고 있는 케이스가 있으므로 totalWeightOnBridge > 0 조건 추가
  while (truck_weights.length > 0 || totalWeightOnBridge > 0) {
    elapsedTime++;

    // 다리를 건넌 트럭 처리
    totalWeightOnBridge -= trucksOnBridge.shift();

    // 가능시 새로운 트럭을 다리 위로 이동
    if (truck_weights.length && totalWeightOnBridge + truck_weights[0] <= weight) {
      const nextTruckWeight = truck_weights.shift();
      trucksOnBridge.push(nextTruckWeight);
      totalWeightOnBridge += nextTruckWeight;
    } else {
      trucksOnBridge.push(0); // 다리 길이를 유지하기 위해 0 push
    }
  }

  return elapsedTime;
}

const cases = [
  generateTestPair([2, 10, [7, 4, 5, 6]], 8), // bridge_length, weight, truck_weights, return
  generateTestPair([100, 100, [10]], 101),
  generateTestPair([100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]], 110),
];

console.log(solution(...cases[2].input));
