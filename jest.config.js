/**
- package.json - type: "module"로 명시하면 ESM(import, export 구문)을 사용할 수 있다
- 하지만 Jest는 Node 기반이므로 ESM을 지원하지 않는다.
- 때문에 cannot use import statement outside a module... 에러가 발생한다
- transformer로 babel-jest를 사용하면 위 문제를 해결할 수 있다
- transformer는 Node에서 지원하지 않는 구문을 사용할 때 파일을 변환해주는 역할
- @see https://dev.to/manuartero/setup-jest-from-scratch-in-a-vanilla-js-project-47o0
*/
export default {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};
