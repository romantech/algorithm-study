/* eslint-disable class-methods-use-this */

/**
 * Represents a MinHeap data structure with a priority queue functionality.
 * The heap is implemented as an array of objects with 'priority' and 'value' properties.
 * Priority values determine the position within the heap, with the lowest value at the front.
 * @class
 * @property {Object[]} heap - An array holding the items in the heap.
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 왼쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 1
  getLeftChildIndex(parentIdx) {
    return 2 * parentIdx + 1;
  }

  // 오른쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 2
  getRightChildIndex(parentIdx) {
    return 2 * parentIdx + 2;
  }

  // 부모 노드 인덱스 = (자식 노드 인덱스 - 1) / 2
  getParentIndex(childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }

  // 주어진 인덱스에 위치한 (부모)노드에 왼쪽 자식 노드가 있는지 확인
  // 왼쪽 자식 노드의 인덱스가 전체 노드 갯수보다 작을 경우에만 자식 노드가 존재한다고 간주
  hasLeftChild(idx) {
    return this.getLeftChildIndex(idx) < this.heap.length;
  }

  // Checks if a right child exists for the given idx
  hasRightChild(idx) {
    return this.getRightChildIndex(idx) < this.heap.length;
  }

  // Checks if a parent exists for the given idx
  hasParent(idx) {
    return this.getParentIndex(idx) >= 0;
  }

  // Retrieves the left child's value for the given idx
  leftChild(idx) {
    return this.heap[this.getLeftChildIndex(idx)];
  }

  // Retrieves the right child's value for the given idx
  rightChild(idx) {
    return this.heap[this.getRightChildIndex(idx)];
  }

  // Retrieves the parent's value for the given idx
  parent(idx) {
    return this.heap[this.getParentIndex(idx)];
  }

  // Swaps the elements at the two given indexes
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  // Returns the minimum element without removing it
  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  // Removes and returns the minimum element from the heap
  remove() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const rootNode = this.heap[0];
    this.heap[0] = this.heap.pop(); // 가장 마지막에 있는 노드를 루트 노드로 만들고
    this.heapifyDown(); // 다시 Min Heap 속성을 갖도록 조정
    return rootNode;
  }

  // Adds a new element to the heap
  add(priority, value) {
    this.heap.push({ priority, value });
    this.heapifyUp();
  }

  // Moves the last element up to its correct position in the heap
  heapifyUp() {
    let idx = this.heap.length - 1;

    // 부모 노드가 없으면 옵셔널 체이닝으로 인해 undefined 반환 -> while문 조건 통과 X
    while (this.parent(idx)?.priority > this.heap[idx].priority) {
      const parentIdx = this.getParentIndex(idx);

      this.swap(parentIdx, idx);
      idx = parentIdx;
    }
  }

  // Moves the root element down to its correct position in the heap
  heapifyDown() {
    let idx = 0;
    console.log(this.getLeftChildIndex(idx));

    while (this.hasLeftChild(idx)) {
      let smallestIdx = this.getLeftChildIndex(idx);
      // 오른쪽 자식 노드가 없으면 옵셔널 체이닝으로 인해 undefined 반환 -> while문 조건 통과 X
      if (this.rightChild(idx)?.priority < this.leftChild(idx).priority) {
        // 왼쪽/오른쪽 자식 중 우선순위가 더 높은(priority 값이 더 작은) 노드 선택
        smallestIdx = this.getRightChildIndex(idx);
      }
      // 부모 노드가 자식 노드보다 더 작으면 heapifyDown 중지
      if (this.heap[idx].priority <= this.heap[smallestIdx].priority) break;

      this.swap(idx, smallestIdx);
      idx = smallestIdx;
    }
  }

  // Prints all elements in the heap
  printHeap(property = 'priority') {
    console.log(this.heap.map(element => element[property]).join(' '));
  }
}

export default MinHeap;
