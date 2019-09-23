module.exports = {
  name: 'swzf-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/swzf-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
