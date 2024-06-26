import { generateTestPair } from '../../utils.js';
import { gcd as GCD } from '../../math.js';

/**
 * [요구사항]
 * 가로 길이 Wcm, 세로 길이 Hcm인 직사각형 종이가 있음
 * 종이에는 격자 선이 그어져 있으며 모든 격자칸은 1cm x 1cm 크기
 * 원랜 격자 선을 따라 1cm x 1cm 정사각형으로 잘라 사용할 예정이었지만,
 * 종이가 대각선 꼭지점 2개를 잇는 방향으로 잘라져 있는 상태 -> 크기가 같은 직각삼각형 2개로 나눠짐
 * 따라서 원래 종이의 가로, 세로 방향과 평행하게 1cm x 1cm로 잘라서 사용하려고 함
 * 가로 길이 W, 세로 길이 H가 주어질 때 사용할 수 있는 정사각형 개수 계산
 *
 * [매개변수]
 * W, H: 1억 이하 자연수
 *
 * [풀이 방법]
 * 가로 8, 세로 12에서 대각선을 그었을 때 선에 정확히 교차하는 지점은 아래 4곳이다 (x, y)
 * (2, 3), (4, 6), (6, 9), (8, 12)
 * 가로 축 2, 4, 6, 8은 8의 약수이고(2의 배수), 세로축 3, 6, 9, 12(3의 배수)는 12의 약수다.
 * 가로 8, 세로 12의 최대공약수는 4인데, 가로/세로 각각 최대공약수를 나누면 (2, 3) 시작점이 된다.
 * (2, 3), (4, 6), (6, 9), (8, 12) 이러한 패턴은 (8, 12)의 최대공약수인 4 만큼 반복돠고 있다.
 * 즉, 대각선이 격자의 교차점을 지나는 패턴은 최대공약수(GCD) 만큼 반복된다.
 *
 * 각 패턴에서 제외되는 직사각형 수에 GCD를 곱하면 전체 제외되는 직사각형 수를 계산할 수 있다.
 * 각 패턴에서 제외되는 직사각형 수는 첫번째 패턴의 (가로 + 세로 - 1) 식으로 구할 수 있다.
 * 예를들어 (2, 3) 첫번째 패턴에서 제외되는 직사각형의 수는 2 + 3 - 1 = 4개다.
 * 따라서 전체 제외되는 직사각형의 수는 4(2 + 3 - 1) * 4(GCD) = 16개가 된다.
 * 직사각형의 가로, 세로를 더한 뒤 GCD 만큼 빼도 동일한 값이 나온다. 8 + 12 - 4 = 16
 * 전체 직사각형 수가 96이므로 남은 직사각형 수는 96 - 16 = 80개가 된다.
 *
 * 위 과정을 식으로 정리하면... (w * h) - (w + h - gcd(w, h))
 *
 * {@link https://blog.itcode.dev/posts/2021/12/27/programmers-a0069|참고글}
 */

function solution(w, h) {
  const totalCells = w * h; // 전체 격자 수
  const gcd = GCD(w, h); // 패턴의 반복 횟수

  const excludedCells = w + h - gcd; // 제외된 격자 수
  return totalCells - excludedCells; // 남은 격자 수
}

const cases = [generateTestPair([8, 12], 80)];

console.log(solution(...cases[0].input) === cases[0].output);
