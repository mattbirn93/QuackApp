import { jsx as _jsx } from "react/jsx-runtime";
import React, { Component } from "react";
class ErrorBoundary extends Component {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        //typicall you would log this to something like TrackJS or NewRelic
        console.log("Errorboundary component caugh an error", error, info);
    }
    render() {
        if (this.state.hasError) {
            console.log("ERROR BOUNDARY DETECTED");
            return (_jsx("h2", { children: "There was an error with this listing. Go back to the home page" }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
