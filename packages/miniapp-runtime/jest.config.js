// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const { jsWithTs: tsjPreset } = require('ts-jest/presets');

module.exports = {
  testEnvironment: 'node',
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lodash-es)/)',
  ],
  testURL: 'http://localhost/',
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    'nerv.js',
    'vue.js',
    'utils.js',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  globals: {
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    ENABLE_SIZE_APIS: true,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_MUTATION_OBSERVER: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
    'ts-jest': {
      diagnostics: false,
      tsconfig: 'tsconfig.test.json',
    },
  },
  testPathIgnorePatterns: [
    'node_modules',
    'utils',
  ],
  moduleNameMapper: {
    // TODO:
    '@tarojs/react': path.resolve(__dirname, '..', '..', 'packages/taro-react/dist/index.js'),
  },
  setupFiles: [path.resolve(__dirname, './src/__tests__/setup.js')],
  testMatch: ['**/__tests__/?(*.)+(spec|test).[jt]s?(x)'],
};
