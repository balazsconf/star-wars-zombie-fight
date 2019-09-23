module.exports = {
  name: 'fight-screen',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/fight-screen',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
