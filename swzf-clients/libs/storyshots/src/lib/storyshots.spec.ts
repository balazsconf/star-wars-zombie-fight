import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

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
        }, module),
    test: imageSnapshot()
});
