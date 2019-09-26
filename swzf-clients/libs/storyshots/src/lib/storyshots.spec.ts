import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

require('babel-plugin-require-context-hook/register')();
const context = global['__requireContext'];
const path=require('path');

const storybookUrl = 'http://localhost:6006';

const getMatchOptions = ({ context: { kind, story }, url }) => {
    return {
        failureThreshold: 0.001,
        failureThresholdType: 'percent',
    };
};

const beforeScreenshot = (page, { context: { kind, story }, url }) => {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, 1000)
    );
};

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
    test: imageSnapshot({storybookUrl, getMatchOptions, beforeScreenshot})
});
