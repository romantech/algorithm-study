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

  // Jest가 감지할 테스트 파일 지정.
  // Jest는 기본적으로 tests 폴더에 *.test.js, *.spec.js 접미사가 붙은 것을 테스트 파일로 인식함
  // 아래 설정을 통해 src 폴더에 있는 모든 js 파일로 인식하도록 변경. (rootDir은 jest.config가 위치한 곳)
  testMatch: ['<rootDir>/src/**/*.js'],

  // 테스트에서 제외할 파일 패턴
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
};
