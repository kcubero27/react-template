import { configure, addDecorator, setAddon, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import JSXAddon from "storybook-addon-jsx";

// Set JSX as global
setAddon(JSXAddon);

// Load all the stories inside components folder
const req = require.context("../src/components", true, /\.story\.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

// Add knobs addon as default
addDecorator(withKnobs);

addParameters({
    options: {
        name: "Foo"
    }
});

configure(loadStories, module);
