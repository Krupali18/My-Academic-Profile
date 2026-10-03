import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface Props {
  children: ReactNode;
  resetKey?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * High-Resilience ErrorBoundary
 * - Auto-retries once silently (50ms) to transparently recover from any transient HMR/render blip.
 * - Auto-resets on route changes (location.pathname) so navigation is never blocked.
 * - If persistent, preserves the site layout (Header + Footer) with a non-destructive recovery UI.
 */
export class ErrorBoundaryClass extends Component<Props, State> {
  private retryCount = 0;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    console.warn('Recoverable error handled by ErrorBoundary:', error?.message || error);

    // Auto-retry once silently after 50ms to seamlessly recover from transient glitches
    if (this.retryCount < 1) {
      this.retryCount++;
      this.retryTimer = setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 50);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    // Automatically clear error when the user navigates to any new route
    if (prevProps.resetKey !== this.props.resetKey) {
      this.retryCount = 0;
      if (this.state.hasError) {
        this.setState({ hasError: false, error: null });
      }
    }
  }

  public componentWillUnmount() {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
    }
  }

  private handleReset = () => {
    this.retryCount = 0;
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.retryCount >= 1) {
      return (
        <>
          <Header solidOnMount />
          <main
            className="main-content"
            style={{
              minHeight: '65vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '120px 24px 60px',
              fontFamily: "'Montserrat', sans-serif",
              textAlign: 'center',
              backgroundColor: '#FAFAFA',
            }}
          >
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#002E5D',
                  marginBottom: '0.75rem',
                }}
              >
                Page Temporarily Unavailable
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  marginBottom: '1.5rem',
                }}
              >
                An issue occurred while loading this section. You can reload or navigate to another page.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={this.handleReset}
                  style={{
                    padding: '10px 22px',
                    backgroundColor: '#002E5D',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 46, 93, 0.2)',
                  }}
                >
                  Reload Page
                </button>
                <Link
                  to="/"
                  onClick={this.handleReset}
                  style={{
                    padding: '10px 22px',
                    backgroundColor: '#FFFFFF',
                    color: '#002E5D',
                    border: '1.5px solid #002E5D',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}

/**
 * Route-aware ErrorBoundary wrapper that automatically resets error state when route changes
 */
export const ErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  let locationKey = '';
  try {
    const location = useLocation();
    locationKey = location.pathname;
  } catch {
    // Graceful fallback if rendered outside Router
  }

  return <ErrorBoundaryClass resetKey={locationKey}>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
