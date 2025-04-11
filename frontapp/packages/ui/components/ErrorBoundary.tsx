// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    // エラー状態を設定する
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: any) {
    // ログ出力や外部エラー監視サービスとの連携もここで可能
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      // カスタムエラー画面
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>エラーが発生しました</h1>
          <p>{this.state.errorMessage || "不明なエラーが発生しました。"}</p>
          <p>恐れ入りますが、もう一度お試しください。</p>
        </div>
      );
    }

    return this.props.children;
  }
}
