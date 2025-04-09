System.register(["react/jsx-runtime", "tamagui", "../../../../packages/auth-next/hooks/useDummyAuth"], function (exports_1, context_1) {
    // packages/app/features/profile/ProfileScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, tamagui_1, useDummyAuth_1;
    var __moduleName = context_1 && context_1.id;
    function ProfileScreen() {
        const { user, isLoading, error, login, logout } = useDummyAuth_1.useDummyAuth();
        if (isLoading) {
            return (_jsx(tamagui_1.YStack, { flex: 1, padding: "$4", alignItems: "center", justifyContent: "center", children: _jsx(tamagui_1.Spinner, {}) }));
        }
        if (error || !user) {
            return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", alignItems: "center", justifyContent: "center", children: [_jsx(tamagui_1.Paragraph, { color: "$color11", children: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F" }), _jsx(tamagui_1.Button, { onPress: login, children: "\u30ED\u30B0\u30A4\u30F3" })] }));
        }
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsxs(tamagui_1.YStack, { alignItems: "center", space: true, children: [_jsx(tamagui_1.Avatar, { size: "$10", src: user.avatarUrl, borderWidth: 2, borderColor: "$color10", circular: true }), _jsx(tamagui_1.Paragraph, { fontSize: "$6", fontWeight: "bold", children: user.name })] }), _jsx(tamagui_1.Paragraph, { children: user.bio }), _jsx(tamagui_1.Paragraph, { color: "$color11", children: user.email }), _jsx(tamagui_1.Button, { onPress: logout, children: "\u30ED\u30B0\u30A2\u30A6\u30C8" })] }));
    }
    exports_1("ProfileScreen", ProfileScreen);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
            },
            function (useDummyAuth_1_1) {
                useDummyAuth_1 = useDummyAuth_1_1;
            }
        ],
        execute: function () {
        }
    };
});
