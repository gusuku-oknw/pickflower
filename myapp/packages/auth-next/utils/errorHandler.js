System.register([], function (exports_1, context_1) {
    "use strict";
    var handleError;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // utils/errorHandler.ts
            exports_1("handleError", handleError = (error) => {
                // エラーに応じた処理（例：ユーザーへの通知、ログ出力など）
                console.error("エラーが発生しました:", error);
                // 必要であれば、Alertなどを利用してユーザーに通知する処理を追加
            });
        }
    };
});
