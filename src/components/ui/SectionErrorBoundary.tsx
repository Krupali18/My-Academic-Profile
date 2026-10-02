import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[SectionErrorBoundary:${this.props.sectionName || 'Unknown'}]`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="w-full py-12 px-6 my-4 rounded-xl border border-red-900/30 bg-red-950/20 text-center">
          <p className="text-sm font-medium text-red-400">
            {this.props.sectionName
              ? `Section "${this.props.sectionName}" failed to load.`
              : 'This section failed to load.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 px-4 py-1.5 text-xs font-semibold rounded-md bg-red-900/40 text-red-200 hover:bg-red-900/60 transition-colors"
          >
            Retry Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
