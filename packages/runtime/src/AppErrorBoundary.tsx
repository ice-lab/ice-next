import * as React from 'react';
import { default as consola } from 'consola';

interface State {
  error: Error;
}

interface Props {
  children?: React.ReactNode;
}

export default class AppErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  public componentDidCatch(error, errorInfo) {
    consola.error('AppErrorBoundary', error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}