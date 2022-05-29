function solution(seoul) {
  let len = 0;
  for (let i = 0; i < seoul.length; i += 1) {
    if (seoul[i] === 'Kim') {
      len = i;
      break;
    }
  }
  return `김서방은 ${len}에 있다`;
}

const c1 = ['Jane', 'Kim']; // "김서방은 1에 있다"
solution(c1); /* ? */

// 레퍼런스
function findKim(seoul) {
  const idx = seoul.indexOf('Kim');
  return '김서방은 ' + idx + '에 있다';
}
