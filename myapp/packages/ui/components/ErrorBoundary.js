System.register(["react/jsx-runtime", "react"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, react_1, ErrorBoundary;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            }
        ],
        execute: function () {
            ErrorBoundary = class ErrorBoundary extends react_1.Component {
                constructor() {
                    super(...arguments);
                    this.state = { hasError: false };
                }
                static getDerivedStateFromError(error) {
                    // エラー状態を設定する
                    return { hasError: true, errorMessage: error.message };
                }
                componentDidCatch(error, info) {
                    // ログ出力や外部エラー監視サービスとの連携もここで可能
                    console.error("ErrorBoundary caught an error", error, info);
                }
                render() {
                    if (this.state.hasError) {
                        // カスタムエラー画面
                        return (_jsxs("div", { style: { padding: '20px', textAlign: 'center' }, children: [_jsx("h1", { children: "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F" }), _jsx("p", { children: this.state.errorMessage || "不明なエラーが発生しました。" }), _jsx("p", { children: "\u6050\u308C\u5165\u308A\u307E\u3059\u304C\u3001\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002" })] }));
                    }
                    return this.props.children;
                }
            };
            exports_1("ErrorBoundary", ErrorBoundary);
        }
    };
});
