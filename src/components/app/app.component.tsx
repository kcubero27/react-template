import { Grid } from "@material-ui/core";
import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "../error-boundary";

const DashboardPageLazy = lazy(() => import("../../views/dashboard-page").then(module => ({ default: module.DashboardPage })));

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
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
            </BrowserRouter>
        );
    }
}
