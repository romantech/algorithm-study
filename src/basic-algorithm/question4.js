// 문제4. 더하고 빼기
// 각 자리의 숫자를 더한 값을 원래 숫자에서 빼고, 숫자에 해당하는 과일코드가 나올때까지 계산하는 함수

const subtractTheSum = (num) => [...String(num)].reduce((acc, digit) => acc - digit, num);
// [...'325'] -> ['3', '2', '5']
// 325 : 325 - '3' - '2' - '5' = 315
// 315 : 315 - '3' - '1' - '5' = 306
// ...

const findFruit = (input) => {
  // 10 이상 결과는 항상 'apple'이므로 apple에 해당하는 숫자만 추출
  const appleNum = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99];
  return appleNum.includes(input) ? '🍎🍏' : findFruit(subtractTheSum(input));
};

// 문제4. 테스트
const testCase4 = [
  {
    input: 10, // 10, 9
    expectedResult: '🍎🍏',
  },
  {
    input: 325, // ...108, 99
    expectedResult: '🍎🍏',
  },
  {
    input: 2022, // ...108, 99
    expectedResult: '🍎🍏',
  },
  {
    input: 211, // ...108, 99
    expectedResult: '🍎🍏',
  },
];

testCase4.forEach(({ input, expectedResult }) => {
  console.log('문제4', {
    input,
    output: findFruit(input),
    passed: findFruit(input) === expectedResult,
  });
});

// archive
const inputFruitMappingString = `1-kiwi
2-pear
3-kiwi
4-banana
5-melon
6-banana
7-melon
8-pineapple
9-apple
10-pineapple
11-cucumber
12-pineapple
13-cucumber
14-orange
15-grape
16-orange
17-grape
18-apple
19-grape
20-cherry
21-pear
22-cherry
23-pear
24-kiwi
25-banana
26-kiwi
27-apple
28-melon
29-banana
30-melon
31-pineapple
32-melon
33-pineapple
34-cucumber
35-orange
36-apple
37-orange
38-grape
39-orange
40-grape
41-cherry
42-pear
43-cherry
44-pear
45-apple
46-pear
47-kiwi
48-banana
49-kiwi
50-banana
51-melon
52-pineapple
53-melon
54-apple
55-cucumber
56-pineapple
57-cucumber
58-orange
59-cucumber
60-orange
61-grape
62-cherry
63-apple
64-cherry
65-pear
66-cherry
67-pear
68-kiwi
69-pear
70-kiwi
71-banana
72-apple
73-banana
74-melon
75-pineapple
76-melon
77-pineapple
78-cucumber
79-pineapple
80-cucumber
81-apple
82-grape
83-orange
84-grape
85-cherry
86-grape
87-cherry
88-pear
89-cherry
90-apple
91-kiwi
92-banana
93-kiwi
94-banana
95-melon
96-banana
97-melon
98-pineapple
99-apple
100-pineapple`;
const entries = inputFruitMappingString.split('\n').map((line) => line.split('-'));
const baseFruitMapping = Object.fromEntries(entries);
console.log(baseFruitMapping);
