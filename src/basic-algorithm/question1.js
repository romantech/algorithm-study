// 문제1. 분기 숫자 구하기
const getQuaterNumber = month => {
  if (month >= 1 && month <= 12) {
    return Math.ceil(month / 3);
  }
  throw new Error('1~12 숫자(월)를 입력하세요');
};

// 문제1. 테스트
Array.from(Array(12).keys(), i => i + 1).forEach(num => {
  let expectResult;
  if (num >= 0 && num <= 3) {
    expectResult = 1;
  } else if (num >= 4 && num <= 6) {
    expectResult = 2;
  } else if (num >= 7 && num <= 9) {
    expectResult = 3;
  } else if (num >= 10 && num <= 12) {
    expectResult = 4;
  }

  console.log('문제1', {
    input: num,
    output: getQuaterNumber(num),
    passed: getQuaterNumber(num) === expectResult,
  });
});
