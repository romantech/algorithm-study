import MinHeap from '../min-heap.js';

describe('MinHeap', () => {
  let minHeap;

  // 테스트 실행 전 작업
  beforeEach(() => {
    minHeap = new MinHeap();
  });

  test('add method places element in correct position', () => {
    minHeap.add(2, 'A');
    minHeap.add(3, 'B');
    minHeap.add(1, 'C'); // This should go to the front
    expect(minHeap.peek().value).toBe('C');
  });

  test('remove method returns and removes the minimum element', () => {
    minHeap.add(2, 'A');
    minHeap.add(3, 'B');
    minHeap.add(1, 'C');
    const removedElement = minHeap.remove();
    expect(removedElement.value).toBe('C');
    expect(minHeap.peek().value).toBe('A');
  });
});

export default MinHeap;
