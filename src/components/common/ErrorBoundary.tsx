import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled Atelier Exception caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetHome = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF8F3] dark:bg-[#1A1412] text-[#241E1C] dark:text-gray-100 flex items-center justify-center p-4 sm:p-6 selection:bg-[#4A121A]/20">
          <div className="max-w-xl w-full bg-white dark:bg-[#241E1C] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-fade-in relative overflow-hidden">
            {/* Top motif bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A121A] via-[#D4AF37] to-[#4A121A]" />

            {/* Icon */}
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A121A] dark:text-[#D4AF37]">
                Atelier System Recovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#241E1C] dark:text-white">
                A Thread Snapped in the Atelier
              </h2>
              <p className="text-xs sm:text-sm text-[#241E1C]/75 dark:text-gray-300 leading-relaxed font-sans max-w-md mx-auto">
                We encountered an unexpected snag while rendering this page. Your catalogue, cart, and preferences have been preserved.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#4A121A] hover:bg-[#380D13] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetHome}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#D4AF37]/50 hover:bg-[#F5EFE6] dark:hover:bg-white/5 text-xs font-semibold text-[#241E1C] dark:text-[#D4AF37] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Error Diagnostics Toggle */}
            <div className="pt-4 border-t border-[#D4AF37]/20 text-left">
              <button
                onClick={this.toggleDetails}
                className="text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-[#4A121A] dark:hover:text-[#D4AF37] flex items-center gap-1 transition-colors mx-auto cursor-pointer"
              >
                <span>{this.state.showDetails ? 'Hide' : 'Inspect'} Technical Diagnostics</span>
                {this.state.showDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {this.state.showDetails && (
                <div className="mt-3 p-3.5 rounded-xl bg-gray-900 text-gray-200 text-[11px] font-mono overflow-x-auto max-h-48 border border-gray-800 space-y-1">
                  <div className="text-rose-400 font-bold">{this.state.error?.toString()}</div>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-gray-400 text-[10px] whitespace-pre-wrap leading-tight">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
