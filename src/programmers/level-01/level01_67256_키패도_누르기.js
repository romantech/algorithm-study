function solution(numbers, hand) {
  let answer = '';

  const currentHandNum = {
    left: '*',
    right: '#',
  };
  const padNum = {
    keyPad: [
      ['*', 0, '#'],
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
    ],
    left: ['*', 7, 4, 1],
    right: ['#', 9, 6, 3],
    middle: [0, 8, 5, 2],
  };

  const checkIndex = currentNum => {
    for (let i = 0; i < padNum.keyPad.length; i += 1) {
      if (padNum.keyPad[i].includes(currentNum)) {
        return i;
      }
    }
  };

  const isMiddleNum = num => {
    return padNum.middle.includes(num);
  };

  const checkDistance = (currentIdx, handType) => {
    const currentHandIdx = checkIndex(currentHandNum[handType]);
    const result = Math.abs(currentIdx - currentHandIdx);
    return isMiddleNum(currentHandNum[handType]) ? result - 1 : result;
  };

  const setHand = (handType, number) => {
    currentHandNum[handType] = number;
    const handTypeShort = handType === 'left' ? 'L' : 'R';
    answer += handTypeShort;
  };

  for (let i = 0; i < numbers.length; i += 1) {
    if (isMiddleNum(numbers[i]) === false) {
      ['left', 'right'].forEach(type =>
        padNum[type].includes(numbers[i]) ? setHand(type, numbers[i]) : '',
      );
    } else {
      // 현재 number[i]가 keyPad 몇번째 인덱스에 있는지 확인
      const currentNumIdx = checkIndex(numbers[i]);
      const leftDistance = checkDistance(currentNumIdx, 'left');
      const rightDistance = checkDistance(currentNumIdx, 'right');

      if (leftDistance === rightDistance) {
        setHand(hand, numbers[i]);
      } else {
        const handType = Math.min(leftDistance, rightDistance) === leftDistance ? 'left' : 'right';
        setHand(handType, numbers[i]);
      }

      // index 차이 0개 일 때 거리 1
      // index 차이 1개 일 때 거리 2
      // index 차이 2개 일 때 거리 3
      // index 차이 3개 일 때 거리 4
    }
  }

  return answer;
}

const numbers = [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5];
const hand = 'right';
// "LRLLLRLLRRL"

solution(numbers, hand);
