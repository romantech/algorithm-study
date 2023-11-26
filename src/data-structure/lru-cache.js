class LRUCache {
  constructor(capacity) {
    /** 캐시 최대 용량 설정 */
    this.capacity = capacity;
    /** 삽입 순서를 기억하는 Map으로 캐시 관리, 가장 최근에 사용한 키가 뒤에 위치 */
    this.cache = new Map();
  }

  /**
   * 주어진 키에 해당하는 값을 캐시에서 가져오는 메서드
   * 값이 존재하면 키를 캐시의 끝으로 이동시켜서 가장 최근에 사용한 것으로 표시 (LRU 캐시 특징)
   */
  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // 조회한 키를 캐시 가장 마지막에 위치 시킴
    return value;
  }

  /**
   * 새로운 키-값 쌍을 캐시에 추가
   * 키가 존재하면 해당 키를 삭제하고 새 값을 캐시 마지막에 추가
   * 캐시가 가득 찼다면, 가장 오래 사용하지 않은 앞쪽 키를 제거하고, 새 항목을 캐시 마지막에 추가
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // 키가 이미 존재하면 해당 키 삭제
    } else if (this.cache.size === this.capacity) {
      /**
       * this.cache.keys() : this.cache 키들을 순회할 수 있는 이터레이터 반환
       * Symbol.iterator 메서드가 구현되어 있는 객체를 "이터러블"이라고 부르며 배열/문자열/Map 등이 대표적인 이터러블
       * Symbol.iterator 메서드를 호출하면 "이터레이터" 객체를 반환하고, 이터레이터 안에는 next() 메서드가 구현되어 있음
       * next() 메서드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체 반환 { done: Boolean, value: any }
       * 즉, next() 메서드를 호출할 때마다 value 프로퍼티를 통해 this.cache 값을 순차적으로 가져올 수 있음
       * 참고로 for of 문으로 값을 순회할 때도 next() 메서드를 호출해서 value 값을 가져오는 것
       */
      const oldestKey = this.cache.keys().next().value; // this.cache의 첫번째 값(가장 오래 사용하지 않은 키)
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value); // 새 항목을 캐시 마지막에 추가
  }
}

const cache = new LRUCache(2);
cache.put('a', 1); // 캐시: {'a'=1}
cache.put('b', 2); // 캐시: {'a'=1, 'b'=2}
console.log(cache.get('a')); // 1 반환, 캐시: {'b'=2, 'a'=1}
cache.put('c', 3); // 가장 오래 사용하지 않은 'b'키 삭제, 캐시: {'a'=1, 'c'=3}
console.log(cache.get('b')); // -1 ('b'키 캐시에서 삭제됨)

export default LRUCache;
