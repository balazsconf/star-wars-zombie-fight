module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  transformIgnorePatterns: [
      'node_modules/(?!@ngrx|@storybook/addon-storyshots/dist)'
  ],
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  coverageReporters: ['html'],
  passWithNoTests: true
};
