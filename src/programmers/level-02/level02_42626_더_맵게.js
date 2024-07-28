/* eslint-disable class-methods-use-this */
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
 * 매번 음식을 섞을 때마다 전체 배열을 정렬하면 비효율적이므로,
 * 가장 낮은 스코빌 지수를 효율적으로 찾기 위해 최소 힙 사용
 * 최소 힙은 부모 노드가 항상 자식 노드보다 작으므로 루트 노트에서 최소 값을 빠르게 찾을 수 있다
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 부모 노드 인덱스 * 2 + 1
  getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1;

  // 부모 노드 인덱스 * 2 + 1
  getRightChildIdx = (parentIdx) => this.getLeftChildIdx(parentIdx) + 1;

  // 부모 노드 인덱스
  getParentIdx = (idx) => Math.floor((idx - 1) / 2);

  hasLeftChild = (idx) => this.getLeftChildIdx(idx) < this.heap.length;

  swap(from, to) {
    [this.heap[from], this.heap[to]] = [this.heap[to], this.heap[from]];
  }

  // 힙 가장 마지막에 새로운 노드 추가
  enqueue(node) {
    if (node === undefined) return;

    this.heap.push(node);
    this.heapifyUp();
  }

  // 새로 추가한 노드를 부모 노드와 비교하여 더 작다면 위치 교환
  // 새로 추가한 노드가 부모 노드보다 크거나 루트에 도달할 때까지 이 과정 반복
  heapifyUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      const parentIdx = this.getParentIdx(idx);
      if (this.heap[idx] > this.heap[parentIdx]) break;

      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }

  // 힙의 루트 노드를 제거하고, 마지막 노드를 루트로 이동시킨다
  // 루트로 이동한 노드를 자식 노드와 비교하여 더 작다면 위치를 바꾼다
  // 루트로 이동한 노드가 자식 노드보다 작거나, 리프 노드에 도달할 때까지 이 과정 반복
  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return root;
  }

  heapifyDown() {
    let idx = 0;

    // 최소 힙은 왼쪽 자식부터 채워지므로 왼쪽 자식이 없다면 leaf에 도달했다고 볼 수 있다
    while (this.hasLeftChild(idx)) {
      const leftIdx = this.getLeftChildIdx(idx);
      const rightIdx = this.getRightChildIdx(idx);

      let smallestIdx = leftIdx;

      if (this.heap[leftIdx] > this.heap[rightIdx]) smallestIdx = rightIdx;
      if (this.heap[idx] < this.heap[smallestIdx]) break;

      this.swap(idx, smallestIdx);
      idx = smallestIdx;
    }
  }

  get peak() {
    return this.heap[0];
  }

  get size() {
    return this.heap.length;
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();
  scoville.forEach(heap.enqueue.bind(heap));

  let count = 0;

  while (heap.peak < K && heap.size > 1) {
    const first = heap.dequeue();
    const second = heap.dequeue();

    heap.enqueue(first + second * 2);
    count++;
  }

  return heap.peak >= K ? count : -1;
}

const cases = [
  generateTestPair([[1, 2, 3, 9, 10, 12], 7], 2),
  generateTestPair([[1, 2, 3], 15], -1),
];

cases.forEach(({ input, output }) => {
  console.log(solution(...input) === output);
});
