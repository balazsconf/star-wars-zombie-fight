import {addParameters, configure} from '@storybook/angular';
import { themes } from '@storybook/theming';

import '../apps/graphql-client/src/styles.scss';

addParameters({options: {theme: themes.dark}});
configure(require.context('../libs/', true, /\.stories\.ts$/), module);

