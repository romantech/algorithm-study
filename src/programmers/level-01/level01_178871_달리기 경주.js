/**
 * callings 배열을 받아 players 배열에 있는 요소를 한칸씩 왼쪽으로 이동하는 문제
 * e.g. players = ["mumu", "soe", "poe", "kai", "mine"], callings = ["kai", "kai", "mine", "mine"]
 * "kai" -> ["mumu", "soe", "kai", "poe", "mine"]
 * "kai" -> ["mumu", "kai", "soe", "poe", "mine"]
 * "mine" -> ["mumu", "kai", "soe", "mine", "poe"]
 * "mine" -> ["mumu", "kai", "mine", "soe", "poe"]
 */

const cases = [
  {
    input: [
      ['mumu', 'soe', 'poe', 'kai', 'mine'], // players
      ['kai', 'kai', 'mine', 'mine'], // callings
    ],
    output: ['mumu', 'kai', 'mine', 'soe', 'poe'],
  },
];

function solution(players, callings) {
  const result = players.slice();
  const dict = result.reduce((acc, cur, i) => {
    acc[cur] = i;
    return acc;
  }, {});

  callings.forEach(calling => {
    const fromIndex = dict[calling];
    const toIndex = fromIndex - 1;

    [dict[result[fromIndex]], dict[result[toIndex]]] = [
      dict[result[toIndex]],
      dict[result[fromIndex]],
    ];
    [result[fromIndex], result[toIndex]] = [result[toIndex], result[fromIndex]];
  });

  return result;
}

solution(...cases[0].input);
