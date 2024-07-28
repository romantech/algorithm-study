import MinHeap from './min-heap.js';

/**
 * A PriorityQueue implementation using the MinHeap structure for prioritizing elements.
 * Inherits from MinHeap class and provides queue functionality.
 * @class extends MinHeap
 */
class PriorityQueue extends MinHeap {
  get size() {
    return this.heap.length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  // Adds an element to the queue with a given priority.
  enqueue(priority, value) {
    this.add(priority, value);
  }

  // Removes and returns the element with the highest priority (lowest numerical value).
  dequeue() {
    return this.remove();
  }

  // Clears the queue by resetting the heap array.
  clear() {
    this.heap = [];
  }

  // Checks if the queue contains a value.
  contains(value) {
    return this.heap.some((element) => element.value === value);
  }
}

export default PriorityQueue;
