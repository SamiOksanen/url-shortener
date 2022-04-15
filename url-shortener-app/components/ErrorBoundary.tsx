import React, { Component, ErrorInfo, ReactNode } from "react";
import { Typography } from '@mui/material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
      }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (<div>
                <Typography variant="h5" component="h3" color="error">
                    Sorry.. there was an error
                </Typography>
            </div>);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;