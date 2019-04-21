import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";

if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        environment: process.env.NODE_ENV,
        release: process.env.REACT_APP_VERSION
    });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
import * as serviceWorker from "./serviceWorker";
serviceWorker.register();
