System.register(["@tamagui/config/v4", "tamagui", "./fonts", "./animations"], function (exports_1, context_1) {
    "use strict";
    var v4_1, tamagui_1, fonts_1, animations_1, tamagui_2, tokens, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (v4_1_1) {
                v4_1 = v4_1_1;
            },
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
                tamagui_2 = tamagui_1_1;
            },
            function (fonts_1_1) {
                fonts_1 = fonts_1_1;
            },
            function (animations_1_1) {
                animations_1 = animations_1_1;
            }
        ],
        execute: function () {
            tokens = tamagui_2.createTokens({
                color: {
                    pinkDark: '#610c62',
                    pinkLight: '#f17efc',
                },
                // ... see configuration docs for required tokens
            });
            exports_1("config", config = tamagui_1.createTamagui({
                ...v4_1.defaultConfig,
                animations: animations_1.animations,
                fonts: {
                    body: fonts_1.bodyFont,
                    heading: fonts_1.headingFont,
                },
                tokens: {
                    ...v4_1.defaultConfig.tokens,
                    ...tokens,
                },
            }));
            exports_1("default", config);
        }
    };
});
