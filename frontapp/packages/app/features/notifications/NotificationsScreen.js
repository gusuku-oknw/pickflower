System.register(["react/jsx-runtime", "react", "tamagui"], function (exports_1, context_1) {
    // packages/app/features/notifications/NotificationsScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1;
    var __moduleName = context_1 && context_1.id;
    function NotificationsScreen() {
        // サンプルの通知メッセージ
        const [notifications, setNotifications] = react_1.useState([
            '新しいメッセージが届きました。',
            'システムメンテナンスのお知らせです。',
            'アップデートが完了しました。',
        ]);
        // 通知を全てクリアするハンドラー
        const clearNotifications = () => {
            setNotifications([]);
            console.log('すべての通知をクリアしました。');
        };
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsx(tamagui_1.Paragraph, { fontSize: "$4", fontWeight: "bold", textAlign: "center", children: "\u901A\u77E5" }), notifications.length === 0 ? (_jsx(tamagui_1.Paragraph, { textAlign: "center", children: "\u65B0\u3057\u3044\u901A\u77E5\u306F\u3042\u308A\u307E\u305B\u3093\u3002" })) : (notifications.map((notification, index) => (_jsx(tamagui_1.Paragraph, { children: notification }, index)))), _jsx(tamagui_1.Button, { onPress: clearNotifications, disabled: notifications.length === 0, children: "\u901A\u77E5\u3092\u5168\u3066\u6D88\u53BB" })] }));
    }
    exports_1("NotificationsScreen", NotificationsScreen);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
            }
        ],
        execute: function () {
        }
    };
});
