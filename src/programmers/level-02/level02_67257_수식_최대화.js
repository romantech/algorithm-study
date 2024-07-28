import { generateTestPair } from '../../utils.js';

/**
 * [요구사항]
 * 해커톤 모든 참가자들은 숫자와 +, -, * 3가지의 연산문자로 이루어진 연산 수식이 전달됨
 * 참가자의 미션은 전달받은 수식에 포함된 연산자의 우선순위를 자유롭게 재정의하여 만들 수 있는 가장 큰 숫자 제출
 * 연산자의 우선순위를 정의할 때 같은 순위의 연산자는 없어야 함 e.g. + > - > * 는 가능하지만 +,* > - 는 불가
 * "100-200*300-500+20" 이 같은 수식을 전달받았을 때 가능한 연산자 우선순위 조합은 3! = 6 가지
 * 주어진 연산 수식이 담긴 문자열 expression이 주어질 때 가장 큰 상금 반환
 *
 * [예시1] - 연산자 우선순위를 * > + > - 로 정했을 때 가장 큰 절대값을 얻을 수 있음
 * = 100-200*300-500+20
 * = 100-(200*300)-500+20 -> 100-60000-500+20
 * = 100-60000-(500+20) -> 100 - 60000 - 520
 * = (100 - 60000) - 520 -> -59,900 - 520
 * = -60,420 -> return 60420
 *
 * [예시2] - 연산자 우선순위를 - > * 로 정했을 때 가장 큰 절대값을 얻을 수 있음 (+ 연산자는 없으므로 고려 안함)
 * = 50*6-3*2
 * = 50*(6-3)*2 -> 50*3*2
 * = (50*3)*2 -> 150*2
 * = 300
 *
 * 만약 연산자 우선 순위를 * -> -로 정한다면...
 * = 50*6-3*2
 * = (50*6)-(3*2) = 300-6
 * = 294
 *
 * [제한사항]
 * expression: 길이 3 이상, 100 이하
 * expression의 피연산자는 0 이상 999 이하, 음수는 없음
 * 같은 연산자끼리는 앞에 있는 것의 우선순위가 더 높음
 */

const getOps = (exp) => exp.match(/[*+-]/g);
const getNums = (exp) => exp.match(/\d+/g).map(Number);

const operatorPerms = [
  ['-', '+', '*'],
  ['-', '*', '+'],
  ['+', '*', '-'],
  ['+', '-', '*'],
  ['*', '-', '+'],
  ['*', '+', '-'],
];

const applyOperation = (a, b, op) => {
  if (op === '*') return a * b;
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  throw new Error('Invalid operator');
};

function solution(expression) {
  const originalNums = getNums(expression);

  const evaluation = (priority) => {
    const nums = originalNums.slice();
    const ops = getOps(expression);

    priority.forEach((op) => {
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === op) {
          nums[i] = applyOperation(nums[i], nums[i + 1], op);
          nums.splice(i + 1, 1);
          ops.splice(i, 1);
          i--;
          // operator to look for is "*"
          // i0 = [-, *, -, +] i++
          // i1 = [-, (*), -, +] pop(1) i--
          // i1 = [-, -, +] i++
          // i2 = [-, -, +]
        }
      }
    });

    return Math.abs(nums[0]);
  };

  return operatorPerms.reduce((max, perm) => Math.max(evaluation(perm), max), 0);
}

const cases = [
  generateTestPair(['100-200*300-500+20'], 60420),
  generateTestPair(['50*6-3*2'], 300),
];

cases.forEach(({ input, output }, i) => {
  const isPassed = solution(...input) === output;
  const message = isPassed ? '통과' : '실패';
  console.log(`${i}번 테스트 ${message}`);
});
