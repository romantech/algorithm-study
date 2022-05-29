function solution(numbers) {
  const set = new Set();
  for (let i = 0; i < numbers.length; i += 1) {
    for (let j = i + 1; j < numbers.length; j += 1) {
      set.add(numbers[i] + numbers[j]);
    }
  }

  return [...set].sort((a, b) => a - b);
}

const case1 = [2, 1, 3, 4, 1]; // [2,3,4,5,6,7]
const case2 = [5, 0, 2, 7]; // [2,5,7,9,12]

solution(case1); /* ? */
