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
