import { configure, addDecorator, setAddon, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import JSXAddon from "storybook-addon-jsx";

// TODO: JSXAddon doesn't work for storybook v5
// @see https://github.com/storybooks/addon-jsx/issues/50
setAddon(JSXAddon);

const req = require.context("../src/components", true, /\.story\.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);

addParameters({
    options: {
        name: "Foo"
    }
});

configure(loadStories, module);
