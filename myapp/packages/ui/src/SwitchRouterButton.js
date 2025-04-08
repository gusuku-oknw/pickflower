System.register(["react/jsx-runtime", "tamagui"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, tamagui_1, SwitchRouterButton;
    var __moduleName = context_1 && context_1.id;
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
            exports_1("SwitchRouterButton", SwitchRouterButton = ({ pagesMode = false }) => {
                return (_jsx(tamagui_1.Anchor, { text: "center", color: "$color12", href: pagesMode ? '/' : '/pages-example', children: _jsxs(tamagui_1.Button, { children: ["Change router: ", pagesMode ? 'pages' : 'app'] }) }));
            });
        }
    };
});
