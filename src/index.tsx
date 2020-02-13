import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { App } from './App';

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: process.env.REACT_APP_VERSION,
});

ReactDOM.render(<App />, document.getElementById('root'));
