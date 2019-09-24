import { configure } from '@storybook/angular';

// import '../apps/graphql-client/src/styles.scss';

// automatically import all files ending in *.stories.ts

//const req = context(__dirname, '../libs/', true, /\.stories\.ts$/);

// configure(context(__dirname, '../libs/', true, /\.stories\.ts$/), module);

configure(require.context('../libs/', true, /\.stories\.ts$/), module);

