const selectionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]]; // swap
    }
  }
  return arr;
};

selectionSort([10, 7, 9, 5, 1]); // [1, 5, 7, 9, 10]
