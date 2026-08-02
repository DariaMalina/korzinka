import type { Preview } from '@storybook/react-vite';

import '../src/tokens.css';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      expanded: true,
    },
    layout: 'centered',
  },
};

export default preview;
