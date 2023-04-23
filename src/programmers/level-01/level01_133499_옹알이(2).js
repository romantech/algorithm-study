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
