import { addons } from '@storybook/addons';

// @see https://storybook.js.org/docs/configurations/options-parameter/
addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: true,
    theme: undefined,
    selectedPanel: 'storybookjs/knobs/panel',
});
