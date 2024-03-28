// 오늘 날짜를 기준으로 파기해야할 개인정보 개수를 반환하는 함수
// 파라미터
// today: 오늘 날짜 YYYY.MM.DD ex) "2022.05.19"
// YYYY -> 2000 <= YYYY <= 2022, MM 1 <= MM <= 12, DD 1 <= DD <= 28
// terms : 약관 종류 및 유효기간 ex) ["A 6", "B 12", "C 3"]
// privacies: 개인정보 ex) ["2021.05.02 A", "2021.07.01 B", "2022.02.19 C", "2022.02.20 C"]
// 2021.05.02 -> 2021.11.01 까지 보관 가능 -> 파기
// 2021.07.01 -> 2022.06.28 까지 보관 가능
// 2022.02.19 -> 2022.05.18 까지 보관 가능 -> 파기
// 2022.02.20 -> 2022.05.19 까지 보관 가능
// return [1, 3]

const cases = [
  {
    input: [
      '2022.05.19',
      ['A 6', 'B 12', 'C 3'],
      ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C'],
    ],
    output: [1, 3],
  },
  {
    input: [
      '2020.01.01',
      ['Z 3', 'D 5'],
      ['2019.01.01 D', '2019.11.15 Z', '2019.08.02 D', '2019.07.01 D', '2018.12.28 Z'],
    ],
    output: [1, 4, 5],
  },
];

function solution(today, terms, privacies) {
  const dateToday = new Date(today);
  const termsMap = terms.reduce((r, c) => {
    const [t, m] = c.split(' ');
    return { ...r, [t]: parseInt(m, 10) };
  }, {});

  const getExpDate = (d, t) => {
    const expDate = new Date(d);
    expDate.setMonth(expDate.getMonth() + termsMap[t]);

    const year = expDate.getFullYear();
    const date = expDate.getDate();
    const month = expDate.getMonth();

    if (date === 1) expDate.setFullYear(year, month - 1, 28);
    else expDate.setDate(date - 1);

    return expDate;
  };

  return privacies.reduce((r, c, i) => {
    return getExpDate(...c.split(' ')) < dateToday ? r.concat(i + 1) : r;
  }, []);
}

solution(...cases[0].input);
