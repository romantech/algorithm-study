// 문제5. 모음 찾기. a, e, i, o, u가 몇개 들어있는지 세는 함수

const getVowels = str => {
  return (str.match(/[aeiou]/gi) || []).length;
  // i 플래그 대소문자 구분 없음,
  // [] 문자 그룹 : 대괄호 내부 문자열 중 하나라도 일치하는 경우
  // [] 대괄호에 들어가는 특수문자는 메타 문자로 취급하지 않으므로 이스케이프 안해도 됨
  // 메타 문자는 정규식 엔진에게 어떤 단일 문자를 매칭할지 알려주는 역할의 특수문자
};

// 문제5. 테스트
const testCase5 = [
  {
    input: 'abracadabra',
    expectedResult: 5,
  },
  {
    input: 'tropical',
    expectedResult: 3,
  },
  {
    input: 'jsdom',
    expectedResult: 1,
  },
];

testCase5.forEach(({ input, expectedResult }) =>
  console.log('문제5', {
    input,
    output: getVowels(input),
    passed: getVowels(input) === expectedResult,
  }),
);
