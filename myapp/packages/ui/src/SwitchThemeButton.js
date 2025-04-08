System.register(["react/jsx-runtime", "react", "tamagui", "@tamagui/next-theme"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1, next_theme_1, SwitchThemeButton;
    var __moduleName = context_1 && context_1.id;
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
            },
            function (next_theme_1_1) {
                next_theme_1 = next_theme_1_1;
            }
        ],
        execute: function () {
            exports_1("SwitchThemeButton", SwitchThemeButton = () => {
                const themeSetting = next_theme_1.useThemeSetting();
                const [theme] = next_theme_1.useRootTheme();
                const [clientTheme, setClientTheme] = react_1.useState('light');
                tamagui_1.useIsomorphicLayoutEffect(() => {
                    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme);
                }, [themeSetting.current, themeSetting.resolvedTheme]);
                return _jsxs(tamagui_1.Button, { onPress: themeSetting.toggle, children: ["Change theme: ", clientTheme] });
            });
        }
    };
});
