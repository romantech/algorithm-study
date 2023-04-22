// 성격 유형 검사 결과를 지표 순서대로 반환
// ------ 지표 유형 ------
// 1번 지표 : 라이언형 R, 튜브형 T
// 2번 지표 : 콘형 C, 프로도형 F
// 3번 지표 : 제이지형 J, 무지형 M
// 4번 지표 : 어피치형 A, 네오형 N
// ------ 선택지 점수 ------
// 매우 비동의 1(3점), 비동의 2(2점), 약간 비동의 3(1점), 모르겠음 4, 약간 동의 5(반대 1점), 동의 6(반대 2점), 매우 동의 7(반대 3점)

// 입출력 예시 : survey : ["AN", "CF", "MJ", "RT", "NA"], choices : [5, 3, 2, 7, 5], result : TCMA
// AN : choice 5 -> 어피치의 반대인 네오형 1점
// CF : choice 3 -> 콘형 1점
// MJ : choice 2 -> 무지형 2점
// RT : choice 7 -> 라이언의 반대인 튜브형 3점
// NA : choice 5 -> 네오형의 반대인 어피치형 1점
// ---------------------------------------
// 1번 지표 : 라이언형(R) 0점 | 튜브형(T) 3점
// 2번 지표 : 콘형(C) 1점    | 프로도형(F) 0점
// 3번 지표 : 제이지형(J) 0점 | 무지형(M) 2점
// 4번 지표 : 어피치형(A) 1점 | 네오형(N) 1점
// 1개 지표에서 점수 같으면 사전 순서대로 반환
// 반환값 : TCMA

// 입출력 예시 : ["TR", "RT", "TR"], choices : [7, 1, 3], result : RCJA
// TR : R 3점
// RT : R 3점
// TR : T 1점
// 1번 지표 : R 6 | T 1
// 2번 지표 : C 0 | F 0
// 3번 지표 : J 0 | M 0
// 4번 지표 : A 0 | N 0
// 사전 순서대로 반환해서 RCJA

function solution1(survey, choices) {
  const metrics = [
    { R: 0, T: 0 }, // 지표 1
    { C: 0, F: 0 }, // 지표 2
    { J: 0, M: 0 }, // 지표 3
    { A: 0, N: 0 }, // 지표 4
  ];

  const findMetricIdx = currentSurvey => {
    return metrics.findIndex(metric => {
      return Object.keys(metric).some(k => currentSurvey.includes(k));
    });
  };

  choices.forEach((choice, i) => {
    const score = Math.abs(choice - 4);
    const currentSurvey = survey[i];
    const currentMetric = metrics[findMetricIdx(currentSurvey)];
    currentMetric[currentSurvey[choice <= 3 ? 0 : 1]] += score;
  });

  return metrics.reduce((result, metric) => {
    const [k0, k1] = Object.keys(metric);
    const [v0, v1] = Object.values(metric);
    const select = v0 >= v1 ? k0 : k1;
    return result + select;
  }, '');
}

solution1(['TR', 'RT', 'TR'], [7, 1, 3]);

// 레퍼런스
function solution2(survey, choices) {
  const MBTI = {};
  const types = ['RT', 'CF', 'JM', 'AN'];

  // MBTI 객체 초기화 // { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 }
  types.forEach(type =>
    type.split('').forEach(char => {
      MBTI[char] = 0;
    }),
  );

  choices.forEach((choice, index) => {
    const [disagree, agree] = survey[index];

    MBTI[choice > 4 ? agree : disagree] += Math.abs(choice - 4);
  });

  return types.map(([a, b]) => (MBTI[b] > MBTI[a] ? b : a)).join('');
}

solution2(['TR', 'RT', 'TR'], [7, 1, 3]);
