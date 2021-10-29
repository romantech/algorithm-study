function solution(a, b) {
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return week[new Date(2016, a - 1, b).getDay()];
}

const case1 = {
  a: 5,
  b: 24,
};

solution(case1.a, case1.b); /* ? */
