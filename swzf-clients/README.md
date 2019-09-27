# Using the Storyshots addon

### Install and configure

- Storyshots is a bit harder to configure, see github
_https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core_

- best to have a separate library with it's own `tsconfig.json` and `jest.config.js` config

### How does it work?

- run it like a unit test suite `storyshot.spec.ts`
- saves snapshots of your stories `__image_snapshots__`
- you commit them with your code
- do changes
- run again compare old snapshots with new snapshots `ng test storyshots`


