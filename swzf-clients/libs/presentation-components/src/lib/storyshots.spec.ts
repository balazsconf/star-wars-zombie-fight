import initStoryshots from '@storybook/addon-storyshots';

require('babel-plugin-require-context-hook/register')();

const context = global['__requireContext'];
const path=require('path');

initStoryshots({
    framework: 'angular',
    config: ({ configure }) =>
        configure(() => {
            // find stories
            const req = context(__dirname, '../../../../libs', true, /\.stories\.ts$/);
            console.log(`Running ${req.keys().length} story files\n`);

            req.keys().forEach(filename => {
                req(filename);
            });
        }, module)
});

// const path = require('path');
//
// require('babel-plugin-require-context-hook/register')();
// const context = global['__requireContext'];
//
// const PROJECT_ROOT = path.join('../../../../');
//
// initStoryshots({
//     framework: 'angular',
//     config: ({ configure }) =>
//         configure(() => {
//             // find stories
//             const req = context(__dirname, path.join(PROJECT_ROOT, 'libs'), true, /\.stories\.ts$/);
//             console.log(`Running ${req.keys().length} story files\n`);
//
//             req.keys().forEach(filename => {
//                 req(filename);
//             });
//         }, module),
// });
