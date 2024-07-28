// 점수 계산 로직
// 총 3번의 기회로 구성
// 보너스 : Single(S), Double(D), Triple(T) 각각 점수의 1제곱, 2제곱, 3제곱으로 계산
// Single, Double, Triple는 점수마다 하나씩 존재

// 옵션 : 스타상(*), 아차상(#).
// 스타상 : 해당 점수와 바로 전에 얻은 점수를 각각 2배로 만듬
// 스타상은 첫번째 기회에서도 나올 수 있음 : 첫번째 스타상의 점수만 2배
// 스타상은 다른 스타상과 중첩 가능 : 중첩된 스타상 점수는 4배
// 스타상과 아차상 중첩 가능 : 중첩된 아차상 점수는 -2배
// 아차상 : 해당 점수 마이너스
// 스타상과 아차상은 점수마다 둘중 하나만 존재 혹은 존재하지 않을 수 있음

// 풀이 예제
// 1S2D*3T -> 1¹ * 2 + 2² * 2 + 3³
// 1D2S#10S -> 1² + 2¹ * (-1) + 10¹
// 1D2S0T -> 1² + 2¹ + 0³ = 3 -> 3
// 1S*2T*3S -> 1¹ * 2 * 2 + 2³ * 2 + 3¹
// 1D#2S*3S -> 1² * (-1) * 2 + 2¹ * 2 + 3¹
// 1T2D3D# -> 1³ + 2² + 3² * (-1)
// 1D2S3T* -> 1² + 2¹ * 2 + 3³ * 2

// 파라미터 : 점수(0~10) | 보너스(S|D|T) | 옵션(*|#|null)으로 이루어진 문자열 3세트
// ex) 1S2D*3T
function solution1(dartResult) {
  const bonus = { S: 1, D: 2, T: 3 };
  const splited = dartResult.match(/\d*\D/g); // [ '1T', '2D', '3D', '#' ]
  const result = [];

  splited.forEach((el) => {
    const len = result.length;
    if (el === '*') {
      result[len - 1] *= 2;
      result[len - 2] *= 2;
    } else if (el === '#') {
      result[len - 1] *= -1;
    } else {
      result.push(el.slice(0, el.length - 1) ** bonus[el[el.length - 1]]);
    }
  });

  return result.reduce((acc, cur) => acc + cur);
}

const c1 = '1S2D*3T'; // 37
const c2 = '1D2S#10S'; // 9
const c3 = '1D2S0T'; // 3
const c4 = '1S*2T*3S'; // 23
const c5 = '1D#2S*3S'; // 5
const c6 = '1T2D3D#'; // -4
const c7 = '1D2S3T*'; // 59
solution1(c7); /* ? */

// 레퍼런스

function solution(dartResult) {
  const bonus = { S: 1, D: 2, T: 3 };
  const options = { '*': 2, '#': -1, 'undefined': 1 };

  const darts = dartResult.match(/\d.?\D/g); // [ '1D', '2S#', '10S' ]
  // g 플래그 붙이면 배열로 반환
  // g플래그 안붙이면 완전 매치, 그룹별로 나옴
  // \d 메타문자 : 0~9까지 10진수 문자
  // . 임의문자 : 개행문자(\n)를 제외한 모든 단일 문자
  // ? 옵셔널 플래그
  // \D : 10진수 문자가 아닌 것

  for (let i = 0; i < darts.length; i++) {
    const split = darts[i].match(/(^\d{1,})(S|D|T)(\*|#)?/);
    // ['1D', '1', 'D', ...] -> '1D' 완전 매치, '1' 첫번재 그룹, 'D' 두번째 그룹
    // ^ : 패턴 시작 앵커
    // {1, } : 최소 n번 이상 일치
    // (^\d{1, }) : 적어도 한자리 수 이상의 십진수 문자로 시작
    // (S|D|T) : S, D, T 중에 하나
    // \* : 특스문자 이스케이프
    // (\*|#)? : * 혹은 # 특수문자 옵셔널

    const score = split[1] ** bonus[split[2]] * options[split[3]];

    if (split[3] === '*' && darts[i - 1]) darts[i - 1] *= options['*'];

    darts[i] = score;
  }

  return darts.reduce((a, b) => a + b);
}
solution(c2); /* ? */
