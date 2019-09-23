module.exports = {
  name: 'intro-screen',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/intro-screen',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
