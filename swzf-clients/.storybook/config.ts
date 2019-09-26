import {addParameters, configure} from '@storybook/angular';

import '../apps/graphql-client/src/styles.scss';
import swzfTheme from './theme';

addParameters({options: {theme: swzfTheme}});
configure(require.context('../libs/', true, /\.stories\.ts$/), module);



