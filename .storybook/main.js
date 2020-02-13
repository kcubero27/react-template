const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.(tsx|mdx)'],
    addons: [
        {
            name: "@storybook/preset-create-react-app",
            options: {
                tsDocgenLoaderOptions: {
                    tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
                }
            }
        },
        {
            name: "@storybook/addon-docs",
            options: {
                configureJSX: true
            }
        },
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-knobs/register',
        '@storybook/addon-a11y/register',
        '@storybook/addon-viewport/register'
    ],
};
