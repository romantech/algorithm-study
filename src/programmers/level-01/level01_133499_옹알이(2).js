/* eslint-disable no-param-reassign */

// "aya", "ye", "woo", "ma"를 조합해서 발음할 수 있는 개수 반환
// 중복 발음은 불가
// ex) ["ayaye", "uuu", "yeye", "yemawoo", "ayaayaa"]
// ayaye : aya + ye
// uuu : 불가
// yeye : 중복 발음 불가
// yemawoo : ye + ma + woo
// ayaayaa : 불가

function solution(babbling) {
  const re = /(aya|ye|woo|ma)/;

  return babbling.reduce((count, str) => {
    const splitted = str.split(re).filter(Boolean);
    const passed = splitted.every((s, i) => {
      if (splitted[i] === splitted[i + 1]) return false;
      return re.test(s);
    });
    return passed ? count + 1 : count;
  }, 0);
}

const cases = [
  { input: ['aya', 'yee', 'u', 'maa'], answer: 1 },
  { input: ['ayaye', 'uuu', 'yeye', 'yemawoo', 'ayaayaa'], answer: 2 },
];

solution(cases[0].input);

// 레퍼런스 (여러 레퍼런스 보면서 입맛에 맞게 수정함)
function solution2(babbling) {
  let answer = 0;

  babbling.forEach(word => {
    // aya|ye|woo|ma 중 하나를 캡처하여 yeye 이렇게 한 번더 중복되는걸 찾고 '-'로 변경
    // e.g. yeye -> ye를 \1로 캡쳐 -> (ye)\1 -> yeye -> 중복되므로 '-'로 변경
    // 참고로 + 수량자는 1번 이상 반복할 때 일치한다고 판단 e.g. (ye)\1+는 yeye+가 되므로 ye가 2번 이상 반복할 때 일치한다고 판단
    word = word.replaceAll(/(aya|ye|woo|ma)\1/g, '-');

    word = word.replaceAll(/(aya|ye|woo|ma)/g, '+');
    if (word.replaceAll('+', '').length === 0) answer++;
  });

  return answer;
}

solution2(cases[0].input);
