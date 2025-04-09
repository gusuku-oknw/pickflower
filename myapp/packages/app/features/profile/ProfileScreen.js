System.register(["react/jsx-runtime", "tamagui", "./hooks/useUser"], function (exports_1, context_1) {
    // packages/app/features/profile/ProfileScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, tamagui_1, useUser_1;
    var __moduleName = context_1 && context_1.id;
    function ProfileScreen() {
        // 例として userId を固定値にしていますが、認証情報やグローバルコンテキストから取得する場合もあります
        const { user, loading, error } = useUser_1.useUser('12345');
        const handleEditProfile = () => {
            // プロフィール編集画面への遷移処理
            console.log('プロフィール編集画面へ遷移します');
        };
        if (loading) {
            return (_jsx(tamagui_1.YStack, { flex: 1, padding: "$4", alignItems: "center", justifyContent: "center", children: _jsx(tamagui_1.Spinner, {}) }));
        }
        if (error || !user) {
            return (_jsx(tamagui_1.YStack, { flex: 1, padding: "$4", alignItems: "center", justifyContent: "center", children: _jsx(tamagui_1.Paragraph, { color: "$color11", children: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F" }) }));
        }
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsxs(tamagui_1.YStack, { alignItems: "center", space: true, children: [_jsx(tamagui_1.Avatar, { size: "$10", src: user.avatarUrl, borderWidth: 2, borderColor: "$color10", circular: true }), _jsx(tamagui_1.Paragraph, { fontSize: "$6", fontWeight: "bold", children: user.name })] }), _jsx(tamagui_1.Paragraph, { children: user.bio }), _jsx(tamagui_1.Paragraph, { color: "$color11", children: user.email }), _jsx(tamagui_1.Button, { onPress: handleEditProfile, children: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u7DE8\u96C6" })] }));
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
            function (useUser_1_1) {
                useUser_1 = useUser_1_1;
            }
        ],
        execute: function () {
        }
    };
});
