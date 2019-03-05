# Initialise a project

## Requirements
Before starting this workshop, you need to have installed [NodeJS](https://nodejs.org/es/). It can be done by downloading the LTS version from their official web page or just using [Homebrew](https://brew.sh/index_es). However, we recommend you to install [nvm](https://github.com/creationix/nvm) so you can have multiple NodeJS versions in your computer. We also recommend you to have installed [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
  
## ReactJS
ReactJS basically is an open-source JavaScript library which is used for building user interfaces specifically for single page applications.
  
Initialise a new project with [create-react-app](https://github.com/facebook/create-react-app). In this way, you won't need any additional configuration to start a ReactJS project.

Run `npx create-react-app my-app --typescript` in your terminal and change _my-app_ for the name of your new directory.

# Basic configuration

## Npm
A good practice in your project will be adding fixed versions. In this way, we can avoid having a missmatch of versions in our different environments. 
  
Create a new file called `.npmrc` and add the following configuration:
```
  save=true
  save-exact=true
```
  
- With [save-exact](https://docs.npmjs.com/misc/config#save-exact) dependencies saved to package.json using --save, --save-dev or --save-optional will be configured with an exact version rather than using npm’s default semver range operator.
- With [save](https://docs.npmjs.com/misc/config#save) every time we install a dependency it will be added automatically in the dependencies inside an existing package.json.
  
## Prettier
[Prettier](https://prettier.io/) is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
  
Run `npm install --save-dev --save-exact prettier` in your terminal in order to install it.
  
Create a new file called `.pretierrc` in the root of your project and add the following configuration:
```
{
  "tabWidth": 4,
  "printWidth": 120
}
```
  
In order to be able to run it from the terminal, we should add the following to the package.json file:
```
{
  "scripts": {
    ...
    "prettier": "prettier --write --config ./.prettierrc './src/**/*.{ts,tsx,html,css}'",
  }
}
```
  
## TSLint
[TSLint](https://palantir.github.io/tslint/) is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors. It is widely supported across modern editors & build systems and can be customized with your own lint rules, configurations, and formatters.
  
We will install TSLint and two other plugins: 
- [tslint-react](https://github.com/palantir/tslint-react): adds more rules related to React and JSX.
- [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier): disables all conflicting rules that can be problematic when using Prettier and TSLint.
  
Run `npm install --save-dev --save-exact tslint tslint-react tslint-config-prettier` in your terminal in order to install all of them.
  
Create a new file called tslint.json in the root of your project with the following content:
```
{
    "defaultSeverity": "warning",
    "extends": ["tslint:latest", "tslint-react", "tslint-config-prettier"],
    "jsRules": {},
    "rules": {
        "no-implicit-dependencies": false,
        "jsx-boolean-value": ["always", { "never": ["exact"] }],
        "jsx-no-lambda": ["always", { "never": ["onClick"] }],
        "object-literal-sort-keys": false,
        "no-shadowed-variable": false,
        "interface-name": false,
        "member-access": [false],
        "no-use-before-declare": false,
        "no-submodule-imports": false,
        "no-console": false
    }
}
```
  
Consider that _no-unused-variables_ rule is not supported anymore. Therefore, we need to configure this in the compiler. Adding the following in tsconfig.json:
```
  {
    "compilerOptions": {
      ...
      "noUnusedLocals": false
    }
  }
```
  
In order to be able to run it from the terminal, we should add the following to the package.json file:
```
{
  "scripts": {
    ...
    "tslint": "tslint './src/**/*.{ts,tsx,html,css}'",
    "tslint:fix": "npm run tslint -- -p ./tsconfig.json -c ./tslint.json --fix",
  }
}
```

## Git hook
[Git](https://git-scm.com) has a way to fire off custom scripts when certain important actions occur. The _pre-commit_ hook is run first, before you even type in a commit message.
 
Run `npm install --save-dev --save-exact lint-staged husky` in your terminal in order to install it.
   
We need to specify the commands we need to execute before the commit is really executed. We can add this inserting the following code inside package.json:
```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,html,css}": [
      "tslint -p ./tsconfig.json -c ./tslint.json --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```
 
At this step, if we want to execute a commit, it will complain because of our _index.css_ file. This is because we are importing it without declaring a variable and TypeScript is not smart enough to know that it's used. To avoid this and be able to do a commit, we will need to run it with the _--no-verify_ option.

# Storybook  
[Storybook](https://storybook.js.org/) is a UI development environment and playground for UI components. The tool enables users to create components independently and showcase components interactively in an isolated development environment.

Run `npm install --save-dev --save-exact @storybook/react @types/storybook__react` in your terminal in order to install it.
  
Then add the following scripts in your package.json:
```
  {
    "scripts": {
      ...
      "storybook": "start-storybook -p 6006 -c .storybook",
      "build-storybook": "build-storybook"
    }
  }
```
   
## Setting up TypeScript to work with Storybook  
Run `npm install --save-dev --save-exact react-docgen-typescript-loader awesome-typescript-loader` in your terminal in order to install all the required dependencies.
  
We will need to create a new configuration directory only for storybook. Go to the root of the project and create a new directory called .storybook. Add a new file called webpack.config.js and add the following content:  
```
  const path = require("path");
  module.exports = storybookBaseConfig => {
    storybookBaseConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader")
        },
        {
          loader: require.resolve("react-docgen-typescript-loader")
        }
      ]
    });
  
    storybookBaseConfig.resolve.extensions.push(".ts", ".tsx");
    return storybookBaseConfig;
  };
```
  
## Add main plugins
Instead of plugins, the extra features for Storybooks are called Addons.
  
There are a lot of [addons](https://storybook.js.org/addons/addon-gallery/) for Storybook.
  
We will install some basic ones:
- [Knobs](https://www.npmjs.com/package/@storybook/addon-knobs): it allows you to edit React props dynamically using the Storybook UI.
- [Actions](https://www.npmjs.com/package/@storybook/addon-actions): it displays data received by event handlers in Storybook. 
- [Options](https://www.npmjs.com/package/@storybook/addon-options): it allows you to edit Storybook configuration. 
- [JSX](https://github.com/storybooks/addon-jsx): it shows you the JSX of the story. It can be useful to see what props you set.
  
Run `npm install --save-dev --save-exact @storybook/addon-knobs @storybook/addon-actions @storybook/addon-options storybook-addon-jsx` in your terminal just to install the dependencies without types.
  
To install the types, we will need to run `npm install --save-dev --save-exact @types/storybook__addon-knobs @types/storybook__addon-actions @types/storybook-addon-jsx`. We don't need the types for the addop options because it already includes the types in the same repository.
  
Even though we have already installed the dependencies, we need to create a file called addons.js inside the .storybook directory to specify the addons that need to import our Storybook. _This file is order sensitive_, it means that the addon imported first will be the active one.
  
```
  import "@storybook/addon-knobs/register";
  import '@storybook/addon-actions/register';
  import '@storybook/addon-options/register';
  import 'storybook-addon-jsx/register';
```
  
## Load all the stories
Create a new file called config.js with the following content:
```
import { configure, addDecorator, setAddon } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import JSXAddon from "storybook-addon-jsx";
import { withOptions } from "@storybook/addon-options/src/preview";

// Set JSX as global
setAddon(JSXAddon);

// Load all the stories inside components folder
const req = require.context("../src/components", true, /\.story\.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

// Add knobs addon as default
addDecorator(withKnobs);

addDecorator(
    withOptions({
        name: "React GraphQL Workshop"
    })
);

configure(loadStories, module);
```

## Create first story
In order to check that everything went fine, we will create our first story. Create a new file inside src/components/test.story.tsx with the following content:
```
import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

interface Props {
    children: any;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
}

const Test = ({ fontSize = 16, fontFamily = "Arial", color = "red", children }: Props) => (
    <div style={{ color, fontFamily, fontSize: fontSize + "px" }}>{children}</div>
);

storiesOf("Test", module)
    .addWithJSX("Paris", () => {
        const fontSize = number("Font size", 45);
        return (
            <Test fontSize={fontSize} fontFamily="Roboto" color="#CAF200">
                Hello
            </Test>
        );
    })
    .addWithJSX("Orleans", () => <Test color="#236544">Hello</Test>);

storiesOf("Test 2", module).addWithJSX("Paris", () => <div color="#333">test</div>);
```

If we run now `npm run storybook`, a new tab will be opened in our browser with the URL _http://localhost:6006/_. 

# Project structure
There is no style guide for ReactJS.

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── apollo-client.ts
│   ├── components
│   │   └── component-1
│   │       ├── index.ts
│   │       ├── component-1.component.tsx
│   │       └── component-1.type.ts
│   ├── domains
│   │   └── post
│   │       ├── graphql
│   │       │   ├── query-1.query.ts
│   │       │   ├── mutation-1.mutation.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   ├── global.d.ts
│   ├── hocs
│   │   └── hoc-1
│   │       ├── hoc-1.component.tsx
│   │       ├── hoc-1.type.ts
│   │       └── index.ts
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   └── views
│       └── view-1
│           ├── index.ts
│           ├── view-1.component.tsx
│           └── view-1.type.ts
├── tsconfig.json
└── tslint.json
```

## Components
There are different ways of creating components. The most used one is called stateless and statefull components.

Functional Component or Stateless component:
- Functional component is like pure function in JavaScript.
- Functional component is also called as a stateless component.
- The functional component only receives props from parent component and return you JSX elements.
- The functional component doesn’t play with any lifecycle methods of React and doesn’t play with the component state.

Class component or statefull component:
- React class component is called as a stateful component.
- Stateful component plays with all life cycle methods of React.
- This component will modify state.

## Error boundary
[Error Boundaries](https://reactjs.org/docs/error-boundaries.html) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

They are ideal to catch all the errors and show them in an error tracking tool like [Sentry](https://sentry.io/welcome/).

### Create an error boundary component
Let's create a new component called error-boundary inside components folder. The content will look like this:
```
import React, { Component } from "react";
import { State } from "./error-boundary.type";

export class ErrorBoundary extends Component<{}, State> {
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    readonly state = { hasError: false };

    componentDidCatch(error: Error, info: object) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
```

error-boundary.type.ts will only contain the state interface:
```
export interface State {
  hasError: boolean;
}
```

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown. Use componentDidCatch() to log error information.

Error boundaries work like a JavaScript catch {} block, but for components. Note that error boundaries only catch errors in the components below them in the tree. 

We will place it in the upper level of our application:
```
export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/">
                            <LaunchError />
                        </Route>
                        <Route path="/create">
                            <h2>Create</h2>
                        </Route>
                        <Route path="/post/:id">
                            <h2>Post profile</h2>
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
```

Just to know that it works as expected, we can fake an error in our application. We can create a new component and throw an error before rendering it:
```
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Error } from "tslint/lib/error";
import { ErrorBoundary } from "../error-boundary";

const LaunchError = () => {
    throw new Error();
    return <p>Lorem ipsum.</p>;
};

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/">
                            <LaunchError />
                        </Route>
                        <Route path="/create">
                            <h2>Create</h2>
                        </Route>
                        <Route path="/post/:id">
                            <h2>Post profile</h2>
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
```

As we are in development mode, we will see a popup with the stacktrace of the error. Once the application uses the prod mode, this message won´t be shown.


# Code Splitting
[Code-Splitting](React.lazy) is a feature supported by bundlers like Webpack and Browserify (via factor-bundle) which can create multiple bundles that can be dynamically loaded at runtime.

The React.lazy function lets you render a dynamic import as a regular component.

By default, React.lazy doesn't support named imports. You can see more in this [discussion](https://github.com/reactjs/rfcs/pull/64). Therefore, we can use the `export default` in our components or do this once we try to import the component like this:
```
const DetailPageLazy = lazy(() => import("../../views/detail-page").then(module => ({ default: module.DetailPage })));
```

If the module containing the OtherComponent is not yet loaded by the time MyComponent renders, we must show some fallback content while we’re waiting for it to load - such as a loading indicator. This is done using the Suspense component:
```
export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ErrorBoundary>
                    <ApolloProvider client={apolloClient}>
                        <Grid container justify="center" alignItems="center" direction="column">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route exact path="/">
                                        <ListPage />
                                    </Route>
                                    <Route path="/create">
                                        <CreatePageLazy />
                                    </Route>
                                    <Route path="/post/:id">
                                        <DetailPageLazy />
                                    </Route>
                                </Switch>
                            </Suspense>
                        </Grid>
                    </ApolloProvider>
                </ErrorBoundary>
            </BrowserRouter>
        );
    }
}
```

To check how code splitting is used in the app, we can do this by going to the main route and try later to go the create or the detail page. If we inspect the network tab, we will see that a second bundle will be loaded.

## TODO:
- [ ] More resources
- [ ] Bibliography
- [ ] Docker


