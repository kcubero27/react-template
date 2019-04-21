import * as Sentry from "@sentry/browser";
import React, { Component } from "react";
import { State } from "./error-boundary.type";

export class ErrorBoundary extends Component<{}, State> {
    readonly state = { hasError: false, eventId: undefined };

    componentDidCatch(error: Error, info: object) {
        process.env.REACT_APP_SENTRY_DSN ? this.sendErrorReport(error, info) : this.setState({ hasError: true });
    }

    sendErrorReport = (error: Error, info: object) => {
        Sentry.withScope(scope => {
            scope.setExtras(info);
            scope.setUser({ email: "john.doe@example.com", username: "johndoe", id: "1" });
            const eventId = Sentry.captureException(error);
            this.setState({ hasError: true, eventId });
        });
    };

    render() {
        if (this.state.hasError && this.state.eventId) {
            return (
                <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>
                    Report feedback
                </button>
            );
        }

        if (this.state.hasError) {
            return <p>Something went bad</p>;
        }

        return this.props.children;
    }
}
