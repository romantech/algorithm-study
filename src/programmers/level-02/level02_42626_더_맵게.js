import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 스코빌 지수는 고추의 매운 척도를 나타내는 숫자(고추에 포함된 캡사이신의 농도를 스코빌 매움 단위로 계량화)
 * 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 스코빌 지수가 가장 낮은 음식을 아래 방법으로 섞음
 * 섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
 * 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복해서 섞음
 * 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없을 땐 -1 반환
 *
 * [매개변수]
 * scoville: 모든 음식의 스코빌 지수가 담긴 배열. 2 이상 1,000,000 이하
 * scoville 각 원소는 각각 0 이상 1,000,000 이하
 * K: 원하는 스코빌 지수. 0이상 1,000,000,000 이하
 *
 * [예제]
 * scoville = [1, 2, 3, 9, 10, 12], K = 7
 * 가장 맵지 않은 음식의 스코빌 지수 1
 * 두 번째로 맵지 않은 음식의 스코빌 지수 2
 * 섞은 음식의 스코빌 지수 = 1 + (2 * 2) = 5 -> [5, 3, 9, 10, 12]
 * 섞은 음식의 스코빌 지수 = 3 + (5 * 2) = 13 -> [13, 9, 10, 12]
 * 모든 음식의 스코빌 지수가 7 이상이므로 섞은 횟수 2 반환
 *
 */

class MinHeap {
  constructor(initialValues) {
    this.heap = initialValues ?? [];
  }
}

function solution(scoville, K) {
  // const sortByAsc = arr => arr.sort((a, b) => a - b);
  // const checkShouldMix = () => scoville.some(s => s < K);
  // sortByAsc(scoville);
  // const mixer = (count = 0) => {
  //   if (scoville[scoville.length - 1] < K) return -1;
  //   if (!checkShouldMix()) return count;
  //   scoville.splice(0, 2);
  //   scoville.push(scoville[0] + scoville[1]);
  //   sortByAsc(scoville);
  //   return mixer(count + 1);
  // };
  // return mixer();
}

const cases = [generateTestPair([[1, 2, 3, 9, 10, 12], 7], 2)];

solution(...cases[0].input);
