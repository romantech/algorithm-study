/**
 * LRU Cache는 제한된 저장 공간을 관리하기 위해 가장 오래전에 사용한 데이터를 제거하는 알고리즘
 * LRU는 Least Recently Used의 약자로 "사용한지 가장 오래된" 정도로 해석
 * */
class LRUCache {
  constructor(capacity) {
    /** 캐시 최대 용량 설정 */
    this.capacity = capacity;
    /** 삽입 순서를 기억하는 Map으로 캐시 관리, 가장 최근에 사용한 key가 뒤에 위치 */
    this.cache = new Map();
  }

  /**
   * 주어진 key에 해당하는 값을 캐시에서 가져오는 메서드
   * 값이 존재하면 key를 캐시의 끝으로 위치시켜서 가장 최근에 사용한 것으로 표시 (LRU 캐시 특징)
   */
  get(key) {
    if (!this.cache.has(key)) return -1;

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // 조회한 key를 캐시 가장 마지막에 위치 시킴
    return value;
  }

  /**
   * 새로운 key-value 쌍을 캐시에 추가하는 메서드
   * key가 존재하면 해당 key를 삭제하고 캐시 마지막에 새 항목으로 추가
   * 캐시가 가득 찼다면, 가장 오래된 앞쪽 key를 제거하고, 캐시 마지막에 새 항목 추가
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // key가 이미 존재하면 삭제
    } else if (this.cache.size === this.capacity) {
      /**
       * this.cache.keys() : this.cache 키들을 순회할 수 있는 이터레이터 반환
       * Symbol.iterator 메서드가 구현되어 있는 객체를 "이터러블"이라고 부르며 배열/문자열/Map 등이 대표적인 이터러블
       * Symbol.iterator 메서드를 호출하면 "이터레이터" 객체를 반환하고, 이터레이터 안에는 next() 메서드가 구현되어 있음
       * next() 메서드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체 반환 { done: Boolean, value: any }
       * 즉, next() 메서드를 호출할 때마다 value 프로퍼티를 통해 this.cache 값을 순차적으로 가져올 수 있음
       * 참고로 for of 문으로 값을 순회할 때도 next() 메서드를 호출해서 value 값을 가져오는 것
       */
      const oldestKey = this.cache.keys().next().value; // this.cache의 첫번째 값(사용한지 가장 오래된 key)
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value); // 새 항목을 캐시 마지막에 추가
  }
}

// const cache = new LRUCache(2);
// cache.put('a', 1); // 캐시: {'a'=1}
// cache.put('b', 2); // 캐시: {'a'=1, 'b'=2}
// console.log(cache.get('a')); // 1 반환, 캐시: {'b'=2, 'a'=1}
// cache.put('c', 3); // 가장 오래 사용하지 않은 'b'키 삭제, 캐시: {'a'=1, 'c'=3}
// console.log(cache.get('b')); // -1 ('b'키 캐시에서 삭제됨)

export default LRUCache;
