import { addDecorator, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

// Storybook doesn't support PostCSS
import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/components.css';
import 'tailwindcss/dist/utilities.css';

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
});

addDecorator(withKnobs);
addDecorator(withA11y);
