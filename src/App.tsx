import React, { Component, lazy, StrictMode, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundaryContainer } from './container/error-boundary';
import './tailwind.css';

const DashboardPageLazy = lazy(() => import('./view/dashboard').then(module => ({ default: module.DashboardView })));

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <StrictMode>
                    <ErrorBoundaryContainer>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route exact path="/">
                                    <DashboardPageLazy />
                                </Route>
                                <Route path="/dashboard">
                                    <DashboardPageLazy />
                                </Route>
                            </Switch>
                        </Suspense>
                    </ErrorBoundaryContainer>
                </StrictMode>
            </BrowserRouter>
        );
    }
}
