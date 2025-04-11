System.register(["react/jsx-runtime", "tamagui"], function (exports_1, context_1) {
    // packages/app/features/contact/ContactScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, tamagui_1;
    var __moduleName = context_1 && context_1.id;
    function ContactScreen() {
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsx(tamagui_1.Paragraph, { fontSize: "$4", textAlign: "center", children: "\u304A\u554F\u3044\u5408\u308F\u305B" }), _jsx(tamagui_1.Paragraph, { children: "\u3054\u8CEA\u554F\u3084\u3054\u8981\u671B\u304C\u3054\u3056\u3044\u307E\u3057\u305F\u3089\u3001\u4E0B\u8A18\u306E\u30DC\u30BF\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304A\u554F\u3044\u5408\u308F\u305B\u30D5\u30A9\u30FC\u30E0\u3078\u304A\u9032\u307F\u304F\u3060\u3055\u3044\u3002" }), _jsx(tamagui_1.Button, { onPress: () => console.log('お問い合わせフォームへ遷移します'), children: "\u30D5\u30A9\u30FC\u30E0\u3092\u958B\u304F" })] }));
    }
    exports_1("ContactScreen", ContactScreen);
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
