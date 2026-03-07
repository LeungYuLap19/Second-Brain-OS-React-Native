import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '@/types';



/**
 * Global error boundary that catches unhandled JS errors in the component tree.
 * Without this, any thrown error white-screens the entire app.
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedErrorBoundaryStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to your error reporting service (Sentry, Bugsnag, etc.)
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-zinc-950 items-center justify-center px-8">
          <Text className="text-2xl font-bold text-zinc-100 mb-2">
            Something went wrong
          </Text>
          <Text className="text-sm text-zinc-400 text-center mb-6 leading-5">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </Text>
          <Pressable
            onPress={this.handleReset}
            className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-xl active:bg-zinc-700"
          >
            <Text className="text-zinc-100 font-semibold">Try Again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
