import LRUCache from '../lru-cache';

describe('LRUCache tests', () => {
  let cache;

  beforeEach(() => {
    cache = new LRUCache(2); // 각 test 블록을 실행하기 전에 초기화됨
  });

  test('should create a cache with given capacity', () => {
    expect(cache.capacity).toBe(2);
  });

  test('put method should add key-value paris', () => {
    cache.put('a', 1);
    expect(cache.get('a')).toBe(1);
  });

  test('put method should update value if key already exists', () => {
    cache.put('a', 1);
    cache.put('a', 2);
    expect(cache.get('a')).toBe(2);
  });

  test('get method should return -1 for non-existent keys', () => {
    expect(cache.get('nonexistent')).toBe(-1);
  });

  // evict: 제거하다
  test('evicts oldest item when cache is full', () => {
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    expect(cache.get('a')).toBe(-1);
  });

  test('get method should update the recent use of a key', () => {
    cache.put('a', 1); // {'a'=1}
    cache.put('b', 2); // {'a'=1, 'b'=2}
    cache.get('a'); // {'b'=2, 'a'=1}
    cache.put('c', 3); // {'a'=1, 'c'=3}
    expect(cache.get('b')).toBe(-1);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
  });
});
