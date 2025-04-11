System.register(["react/jsx-runtime", "react", "tamagui"], function (exports_1, context_1) {
    // packages/app/features/settings/SettingsScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1;
    var __moduleName = context_1 && context_1.id;
    function SettingsScreen() {
        // 状態管理：通知の有効化とダークモードの設定をサンプル状態として用意
        const [notificationsEnabled, setNotificationsEnabled] = react_1.default.useState(true);
        const [darkModeEnabled, setDarkModeEnabled] = react_1.default.useState(false);
        const toggleNotifications = () => {
            setNotificationsEnabled(prev => !prev);
            console.log('通知設定:', !notificationsEnabled);
        };
        const toggleDarkMode = () => {
            setDarkModeEnabled(prev => !prev);
            console.log('ダークモード設定:', !darkModeEnabled);
        };
        const handleSaveSettings = () => {
            // 設定を保存する処理（例: API 呼び出し、ローカルストレージへの保存など）
            console.log('設定を保存:', { notificationsEnabled, darkModeEnabled });
        };
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsx(tamagui_1.Paragraph, { fontSize: "$4", fontWeight: "bold", textAlign: "center", children: "\u8A2D\u5B9A" }), _jsxs(tamagui_1.YStack, { space: true, children: [_jsxs(tamagui_1.YStack, { horizontal: true, alignItems: "center", space: true, children: [_jsx(tamagui_1.Paragraph, { flex: 1, children: "\u901A\u77E5\u3092\u6709\u52B9\u306B\u3059\u308B" }), _jsx(tamagui_1.Switch, { checked: notificationsEnabled, onChange: toggleNotifications })] }), _jsxs(tamagui_1.YStack, { horizontal: true, alignItems: "center", space: true, children: [_jsx(tamagui_1.Paragraph, { flex: 1, children: "\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9" }), _jsx(tamagui_1.Switch, { checked: darkModeEnabled, onChange: toggleDarkMode })] })] }), _jsx(tamagui_1.Button, { onPress: handleSaveSettings, children: "\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3059\u308B" })] }));
    }
    exports_1("SettingsScreen", SettingsScreen);
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
