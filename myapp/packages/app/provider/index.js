System.register(["react/jsx-runtime", "react-native", "@my/ui", "./ToastViewport"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, react_native_1, ui_1, ToastViewport_1;
    var __moduleName = context_1 && context_1.id;
    function Provider({ children, ...rest }) {
        const colorScheme = react_native_1.useColorScheme();
        return (_jsx(ui_1.TamaguiProvider, { config: ui_1.config, defaultTheme: colorScheme === 'dark' ? 'dark' : 'light', ...rest, children: _jsxs(ui_1.ToastProvider, { swipeDirection: "horizontal", duration: 6000, native: ui_1.isWeb ? [] : ['mobile'], children: [children, _jsx(ui_1.CustomToast, {}), _jsx(ToastViewport_1.ToastViewport, {})] }) }));
    }
    exports_1("Provider", Provider);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_native_1_1) {
                react_native_1 = react_native_1_1;
            },
            function (ui_1_1) {
                ui_1 = ui_1_1;
            },
            function (ToastViewport_1_1) {
                ToastViewport_1 = ToastViewport_1_1;
            }
        ],
        execute: function () {
        }
    };
});
