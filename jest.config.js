const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/main/**'],
  coveragePathIgnorePatterns: ['src/interfaces'],
  watchPathIgnorePatterns: ['globalConfig'],
};
