function solution(n, arr1, arr2) {
  // 2진수 변환
  const converter = arr => {
    return arr.reduce((acc, cur) => {
      let converted = cur.toString(2);
      converted = '0'.repeat(n - converted.length) + converted;
      return acc.concat(converted);
    }, []);
  };
  const map1 = converter(arr1); /* ? */
  const map2 = converter(arr2); /* ? */

  const result = [];
  for (let i = 0; i < n; i += 1) {
    let el = '';
    for (let j = 0; j < n; j += 1) {
      if (map1[i][j] === '1' || map2[i][j] === '1') {
        el += '#';
      } else {
        el += ' ';
      }
    }
    result.push(el);
  }
  return result;
}

const c1 = {
  n: 5,
  arr1: [9, 20, 28, 18, 11],
  arr2: [30, 1, 21, 17, 28],
}; // ["#####","# # #", "### #", "# ##", "#####"]

const c2 = {
  n: 6,
  arr1: [46, 33, 33, 22, 31, 50],
  arr2: [27, 56, 19, 14, 14, 10],
}; // ["######", "### #", "## ##", " #### ", " #####", "### # "]

solution(c2.n, c2.arr1, c2.arr2); /* ? */
