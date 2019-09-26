module.exports = {
    name: 'storyshots',
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest'
    },
    transformIgnorePatterns: [
        'node_modules/(?!@ngrx|@storybook/addon-storyshots/dist/frameworks/angular)'
    ],
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html', 'json'],
    coverageReporters: ['html'],
  coverageDirectory: '../../coverage/libs/storyshots'
};
