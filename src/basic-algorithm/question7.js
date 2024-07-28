// 문제7. 친구 찾기, 이름이 4글자면 친구
const findFriends = (names) => {
  return names.filter((name) => name.length === 4);
};

// 문제7. 테스트
const testCase7 = [
  {
    input: ['Ryan', 'Kieran', 'Mark'],
    expectedResult: ['Ryan', 'Mark'],
  },
  {
    input: ['HONNE', '아이유', '南拳妈妈', 'FKJ', 'Darius'],
    expectedResult: ['南拳妈妈'],
  },
  {
    input: ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis'],
    expectedResult: [],
  },
];

testCase7.forEach(({ input, expectedResult }) =>
  console.log('문제7', {
    input,
    output: findFriends(input),
    passed: findFriends(input).every((name, idx) => name === expectedResult[idx]),
  }),
);
