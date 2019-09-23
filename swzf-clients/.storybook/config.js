import { configure } from '@storybook/angular';

import '../apps/graphql-client/src/styles.scss';

// automatically import all files ending in *.stories.ts
configure(require.context('../libs/', true, /\.stories\.ts$/), module);
