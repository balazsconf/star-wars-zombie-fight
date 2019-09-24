module.exports = {
    name: 'storyshots',
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest'
    },
    transformIgnorePatterns: [
        'node_modules/(?!@ngrx|@storybook/addon-storyshots/dist/frameworks/angular)'
    ],
    moduleFileExtensions: ['ts', 'js', 'html', 'json'],
    coverageReporters: ['html'],
  coverageDirectory: '../../coverage/libs/storyshots'
};
