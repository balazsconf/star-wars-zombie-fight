module.exports = {
  name: 'graphql-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/graphql-client',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
