// A, B에서 각각 1개의 숫자를 뽑아 두 수를 곱한 누적값 중 가장 작은 값 반환
// 각 배열에서 k번째 숫자는 한 번만 뽑을 수 있음
// A, B 둘다 오름차순 정렬하고 A는 작은 숫자, B는 큰 숫자로 곱하는 방식으로 최소 누적값 계산

function solution(A, B) {
  const len = A.length;
  let result = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  for (let i = 0; i < len; i += 1) {
    const a = A.shift();
    const b = B.shift();
    result += a * b;
  }
  return result;
}

function reference(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  return A.reduce((acc, a, i) => acc + a * B[i], 0);
}

const cases = [
  {
    input: [
      [1, 4, 2],
      [5, 4, 4],
    ],
    output: 29, // 0+(1*5)=5 -> 5+(4*4)=21 -> 21+(2*4)=29
  },
  {
    input: [
      [1, 2],
      [3, 4], // 0+(1*4)=4 -> 4+(2*3)=10
    ],
    output: 10,
  },
];

cases.forEach(({ input, output }) => {
  const [A, B] = input;
  console.log(solution(A.slice(), B.slice()) === output);
  console.log(reference(A.slice(), B.slice()) === output);
});
