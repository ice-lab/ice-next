import * as React from 'react';

type Props = {};
type State = {
  error: Error;
};

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('AppErrorBoundary', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}