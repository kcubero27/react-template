import React, { Component, lazy, StrictMode, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "../error-boundary";

const DashboardPageLazy = lazy(() => import("../../views/dashboard").then(module => ({ default: module.Dashboard })));

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <StrictMode>
                    <ErrorBoundary>
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
                    </ErrorBoundary>
                </StrictMode>
            </BrowserRouter>
        );
    }
}
