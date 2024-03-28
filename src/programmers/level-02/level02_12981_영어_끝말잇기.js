/**
 * [요구사항]
 * 끝말잇기 규칙, 이전에 등장했던 단어 및 한 글자 단어 사용 불가
 * 이전에 등장했던 단어를 말하거나 이저나 등장했던 단어의 마지막 글자로 시작하는 단어가 아닐경우 탈락
 * 3명이 끝말잇기를 했을 때: tank → kick → know → wheel → land → dream → mother → robot → tank
 * 사람 수 n과 순서대로 말한 단어 words가 주어지고, 가장 먼저 탈락하는 사람의 번호와 그 사람이 몇 번째에 탈락하는지 [번호, 차례] 반환
 *
 * 사람 수 n : 2이상 10이하
 * words: n 이상 100이하
 * 단어 길이: 2이상 50이하
 * 모든 단어는 알파벳 소문자
 * 탈락자가 없으면 [0, 0] 반환
 */

function solution(n, words) {
  const usedWords = new Set();

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    const firstChar = words[i].at(0);
    const prevWordLastChar = i === 0 ? firstChar : words[i - 1].at(-1);

    if (usedWords.has(word) || firstChar !== prevWordLastChar) {
      const round = Math.ceil((i + 1) / n); // 몇번째 탈락하는지
      const player = (i % n) + 1; // 탈락하는 사람 번호
      return [player, round];
    }

    usedWords.add(word);
  }

  return [0, 0];
}

function solution2(n, words) {
  let firstInvalidWordIdx = 0;

  words.reduce((prevWordLastChar, curWord, idx) => {
    const isDuplicated = words.slice(0, idx).includes(curWord);
    const notMatching = prevWordLastChar !== curWord.at(0);
    const isFailed = isDuplicated || notMatching;

    // 가장 먼저 탈락한 사람에 대한 인덱스 정보를 저장하기 위해 firstInvalidWordIdx === 0 조건 추가
    if (firstInvalidWordIdx === 0 && isFailed) firstInvalidWordIdx = idx;
    return curWord.at(-1);
  }, '');

  return firstInvalidWordIdx
    ? [(firstInvalidWordIdx % n) + 1, Math.floor(firstInvalidWordIdx / n) + 1]
    : [0, 0];
}

const cases = [
  {
    input: [3, ['tank', 'kick', 'know', 'wheel', 'land', 'dream', 'mother', 'robot', 'tank']],
    output: [3, 3],
  },
  {
    input: [
      5,
      [
        'hello',
        'observe',
        'effect',
        'take',
        'either',
        'recognize',
        'encourage',
        'ensure',
        'establish',
        'hang',
        'gather',
        'refer',
        'reference',
        'estimate',
        'executive',
      ],
    ],
    output: [0, 0],
  },
  {
    input: [2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw']],
    output: [1, 3],
  },
];

console.log(solution(...cases[0].input));
console.log(solution2(...cases[0].input));
