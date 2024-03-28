/* eslint-disable no-param-reassign */
import { generateTestPair } from '../../utils.js';
import { LRUCache } from '../../data-structure/index.js';

/**
 * [문제 설명]
 * cacheSize : 캐시 크기, 0이상 30이하
 * cities : 도시 이름 배열, 최대 100,000개, 각 요소는 최대 20자로 된 영어(대소문자 구분 없음)
 * 입력된 도시 이름 배열을 순서대로 처리할 때 "총 실행시간" 출력
 * 캐시 알고리즘은 LRU(Least Recently Used; 사용한지 가장 오래된) 사용
 * cache hit(요청한 데이터가 캐시에 존재하여 제공할 수 있는 상황)일 경우 실행시간은 1
 * cache miss일 경우 실행시간은 5
 */

function solution(cacheSize, cities) {
  const MISS = 5;
  const HIT = 1;

  if (cacheSize === 0) return MISS * cities.length;

  const cache = new LRUCache(cacheSize);

  return cities.reduce((answer, city) => {
    city = city.toUpperCase();
    if (cache.get(city) === -1) {
      cache.put(city);
      return answer + MISS;
    }
    return answer + HIT;
  }, 0);
}

function reference(cacheSize, cities) {
  const MISS = 5;
  const HIT = 1;

  if (cacheSize === 0) return MISS * cities.length;

  let answer = 0;
  const cache = [];

  cities.forEach(city => {
    city = city.toUpperCase();
    const idx = cache.indexOf(city);

    if (idx > -1) {
      // 캐시에 존재할 때
      cache.splice(idx, 1);
      answer += HIT;
    } else {
      // 캐시에 존재하지 않고, 캐시가 꽉 찾을 때
      if (cache.length >= cacheSize) cache.shift(); // 오래된 캐시 제거
      answer += MISS;
    }

    cache.push(city);
  });

  return answer;
}

const cases = [
  generateTestPair(
    [
      3, // cacheSize
      ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA'], // cities
    ],
    50, // 실행시간
  ),
  generateTestPair(
    [3, ['Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul']],
    21,
  ),
  generateTestPair(
    [
      2,
      [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'SanFrancisco',
        'Seoul',
        'Rome',
        'Paris',
        'Jeju',
        'NewYork',
        'Rome',
      ],
    ],
    60,
  ),
  generateTestPair(
    [
      5,
      [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'SanFrancisco',
        'Seoul',
        'Rome',
        'Paris',
        'Jeju',
        'NewYork',
        'Rome',
      ],
    ],
    52,
  ),
  generateTestPair([2, ['Jeju', 'Pangyo', 'NewYork', 'newyork']], 16),
  generateTestPair([0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']], 25),
];

cases.forEach(({ input, output }) => {
  console.log(solution(...input) === output);
  console.log(reference(...input) === output);
});
