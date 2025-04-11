System.register(["react/jsx-runtime", "tamagui"], function (exports_1, context_1) {
    // packages/app/features/terms/TermsScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, tamagui_1;
    var __moduleName = context_1 && context_1.id;
    function TermsScreen() {
        const handleAccept = () => {
            // ここに利用規約に同意する処理や画面遷移などを実装してください
            console.log('利用規約に同意しました');
        };
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsx(tamagui_1.Paragraph, { fontSize: "$5", fontWeight: "bold", textAlign: "center", children: "\u5229\u7528\u898F\u7D04" }), _jsx(tamagui_1.Paragraph, { children: "\u3053\u3061\u3089\u306E\u5229\u7528\u898F\u7D04\u306F\u3001\u30B5\u30FC\u30D3\u30B9\u3092\u3054\u5229\u7528\u3044\u305F\u3060\u304F\u306B\u3042\u305F\u3063\u3066\u306E\u91CD\u8981\u306A\u30EB\u30FC\u30EB\u3092\u5B9A\u3081\u3066\u3044\u307E\u3059\u3002\u304A\u5BA2\u69D8\u306F\u3001\u4EE5\u4E0B\u306E\u5185\u5BB9\u306B\u3054\u540C\u610F\u306E\u4E0A\u3067\u30B5\u30FC\u30D3\u30B9\u3092\u3054\u5229\u7528\u304F\u3060\u3055\u3044\u3002" }), _jsx(tamagui_1.Paragraph, { children: "\u203B \u5229\u7528\u898F\u7D04\u306E\u8A73\u7D30\u306A\u5185\u5BB9\u306F\u3001\u5B9F\u969B\u306E\u904B\u7528\u306B\u5408\u308F\u305B\u3066\u3053\u3061\u3089\u306B\u8A18\u8F09\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u5FC5\u8981\u306B\u5FDC\u3058\u3066\u30BB\u30AF\u30B7\u30E7\u30F3\u5206\u3051\u3084\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u306A\u30B3\u30F3\u30C6\u30CA\u306A\u3069\u3092\u5229\u7528\u3059\u308B\u3068\u3088\u3044\u3067\u3057\u3087\u3046\u3002" }), _jsx(tamagui_1.Button, { onPress: handleAccept, children: "\u540C\u610F\u3059\u308B" })] }));
    }
    exports_1("TermsScreen", TermsScreen);
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
