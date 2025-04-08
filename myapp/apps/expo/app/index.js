System.register(["react/jsx-runtime", "app/features/home/screen", "expo-router"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, screen_1, expo_router_1;
    var __moduleName = context_1 && context_1.id;
    function Screen() {
        return (_jsxs(_Fragment, { children: [_jsx(expo_router_1.Stack.Screen, { options: {
                        title: 'Home',
                    } }), _jsx(screen_1.HomeScreen, {})] }));
    }
    exports_1("default", Screen);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (screen_1_1) {
                screen_1 = screen_1_1;
            },
            function (expo_router_1_1) {
                expo_router_1 = expo_router_1_1;
            }
        ],
        execute: function () {
        }
    };
});
