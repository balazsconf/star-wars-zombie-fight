module.exports = {
  name: 'presentation-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/presentation-components',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
