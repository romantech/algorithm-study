// 홀수는 '수'
// 짝수는 '박'

function solution(n) {
  return [...Array(n)].reduce(
    (acc, _, idx) => (idx % 2 === 0 ? acc.concat('수') : acc.concat('박')),
    '',
  );
}

const c1 = 3; // '수박수'
const c2 = 4; // '수박수박'
const c3 = 11;

solution(c2); /* ? */

// 레퍼런스
const waterMelon = n => {
  return '수박'.repeat(n / 2) + (n % 2 === 1 ? '수' : '');
  // n을 2('수박')로 나눠서 짝수번 만큼한 repeat 하고
  // n / 2 나머지가 홀수라면 수'추가(짝수일땐 '수박'을 앞에서 반복해서 추가했으므로 별도로 문자 추가하지 않음)
  // 참고로 1 % 2 === 1 (% 좌측(피제수)이 우측(제수)보다 작다면 항상 좌측이 결과값)
  // '수박'.repeat(5.5) -> '수박수박수박수박수박' (repeat 메서드는 소수점은 버림)
};

waterMelon(c3); /* ? */
