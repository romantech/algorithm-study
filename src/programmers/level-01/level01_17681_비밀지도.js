/* eslint-disable no-bitwise */
function solution1(n, arr1, arr2) {
  // 2진수 변환
  const converter = (arr) => {
    return arr.reduce((acc, cur) => {
      let converted = cur.toString(2);
      converted = '0'.repeat(n - converted.length) + converted;
      return acc.concat(converted);
    }, []);
  };
  const map1 = converter(arr1); /* ? */
  const map2 = converter(arr2); /* ? */

  return map1.map((el, i1) =>
    el
      .split('')
      .reduce((acc, cur, i2) => (cur === '1' || map2[i1][i2] === '1' ? acc + '#' : acc + ' '), ''),
  );
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

solution1(c1.n, c1.arr1, c1.arr2); /* ? */

// * 레퍼런스

function solution2(n, arr1, arr2) {
  /**
   * v | arr2[i]는 OR(Single Vertical Bar) 비트연산자(Bitwise Operator).
   * 비교하는 이진수 숫자의 자리수가 하나라도 1이라면 1반환
   * 46의 2진수는 101110, 27의 2진수는 11011
   * 101110 (46)
   * 011011 (27)
   * ------
   * 111111 (63)
   * 따라서 47 | 27 = 63
   */

  return arr1.map((v, i) =>
    // +a는 문자열을 숫자로 변경해줌. +'0' -> 0
    // 정규식에서 | 교체구문은 OR 연산자와 동일. 현재 문자열이 1이나 0이면 replace 진행
    addZero(n, (v | arr2[i]).toString(2)).replace(/1|0/g, (a) => (+a ? '#' : ' ')),
  );
}

const addZero = (n, s) => '0'.repeat(n - s.length) + s;
solution2(c2.n, c2.arr1, c2.arr2); /* ? */
