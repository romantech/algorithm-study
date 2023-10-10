// 사람 수 n과 자연수 k가 주어지고, 사전 순으로 사람을 나열했을 때 k번째 방법 반환
// n <= 20, k <= n!

function solution(n, k) {
  const answer = [];
  return answer;
}

const cases = [
  {
    input: [2, 2], // [n, k]
    output: [2, 1], // [1, 2], [2, 1]
  },
  {
    input: [3, 5], // [n, k]
    output: [3, 1, 2], // [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1], ... 6가지(3!)
  },
  {
    input: [4, 2],
    output: [1, 2, 4, 3], // [1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2], [1, 4, 2, 3], [1, 4, 3, 2], ... 24가지(4!)
  },
];

// 순열에 대한 기본 개념:
// 0! = 1! = 1 (팩토리얼의 기본 정의)
// n개의 원소에 대한 경우의 수는 n!
// 원소의 순서가 바뀌는 지점은 (n! / n) -> 이 결과는 (n - 1)!과 동일

// 알고리즘의 핵심 개념:
// c는 (n - 1)! 팩토리얼 값으로, 이 값마다 앞 자리 숫자가 바뀐다
// k = i * c 이므로 i = k / c
// 즉, k번째 순열의 첫 번째 숫자의 인덱스는 (k - 1) / c (인자로 받는 k는 1부터 시작하므로, 인덱스 계산을 위해 1을 뺌).
// 예시: arr = [1, 2, 3], c = 2, k = 5일 때, (5 - 1) / 2 = 2. 따라서 k의 첫 번째 숫자는 arr 2번 인덱스인 3

// 첫 번째 숫자를 결정한 후:
// k는 이전 단계의 나머지 값으로 업데이트해서 (5 - 1) % 2 = 0
// arr는 방금 결정한 숫자를 제외한 새 배열로 업데이트해서 [1, 2]
// 예시: arr = [1, 2], c = (2 - 1)! = 1, k = 0일 때, 0 / 1 = 0. 따라서 k의 두 번째 숫자는 arr 0번 인덱스인 1

// 위의 과정을 반복하여 순열의 모든 숫자 결정
// 시각적인 설명은 타 블로그 https://bit.ly/46n4k2t 참고

// 문제 해결 원리:
// 책장에 100페이지(c) 분량의 책이 3권 있고, 250 페이지(k)를 찾아야 한다고 가정
// 250 / 100 = 2(몫)... 50(나머지) -> 3번째 책(몫)의 50페이지(나머지)인 것을 알 수 있음
// 순열도 위와 비슷한 원리로 작동. arr = [1, 2, 3] 순열에서 k = 5번째 순열을 찾는다고 가정
// 숫자 3개의 순열 개수는 3! = 6개이고, 6 / 3 = 2개(c) 마다 앞자리 숫자가 바뀜
// (5 - 1) / 2 = 2(몫)... 0(나머지)
// 위 식에서 몫 2는 첫번째 숫자가 3임을 의미 (1로 시작하는 2개, 2로 시작하는 2개를 지나서 3으로 시작하는 순열)
// 첫번째 숫자가 3으로 결정됐으므로 남은 숫자는 [1, 2], 남은 숫자로 만들 수 있는 순열 개수는 2! = 2개
// 이제 이 숫자로 만들 수 잇는 순열에서 k = 0번째 순열을 찾아야 함. 여기서 나머지 0이 새로운 k 값으로 사용됨
// 즉, 새로운 k값은 작은 순열 내에서 상대적 위치를 나타냄
