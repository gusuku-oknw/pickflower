System.register(["react/jsx-runtime", "tamagui"], function (exports_1, context_1) {
    // packages/app/features/logout/LogoutScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, tamagui_1;
    var __moduleName = context_1 && context_1.id;
    function LogoutScreen() {
        const handleLogout = () => {
            // ここにログアウト処理を追加してください
            // 例: next-auth を使っている場合は signOut() を呼び出す
            // signOut({ redirect: true, callbackUrl: '/' })
            console.log('ログアウト処理を実行中...');
        };
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsx(tamagui_1.Paragraph, { fontSize: "$4", textAlign: "center", children: "\u30ED\u30B0\u30A2\u30A6\u30C8" }), _jsx(tamagui_1.Paragraph, { children: "\u672C\u5F53\u306B\u30ED\u30B0\u30A2\u30A6\u30C8\u3057\u3066\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F\u30ED\u30B0\u30A2\u30A6\u30C8\u3059\u308B\u3068\u3001\u518D\u5EA6\u30ED\u30B0\u30A4\u30F3\u304C\u5FC5\u8981\u306B\u306A\u308A\u307E\u3059\u3002" }), _jsx(tamagui_1.Button, { onPress: handleLogout, children: "\u30ED\u30B0\u30A2\u30A6\u30C8\u3059\u308B" })] }));
    }
    exports_1("LogoutScreen", LogoutScreen);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
            }
        ],
        execute: function () {
        }
    };
});
