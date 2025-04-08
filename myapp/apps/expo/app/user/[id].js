System.register(["react/jsx-runtime", "app/features/user/detail-screen", "expo-router", "solito/navigation"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, detail_screen_1, expo_router_1, navigation_1;
    var __moduleName = context_1 && context_1.id;
    function Screen() {
        const { id } = navigation_1.useParams();
        return (_jsxs(_Fragment, { children: [_jsx(expo_router_1.Stack.Screen, { options: {
                        title: 'User',
                        presentation: 'modal',
                        animation: 'slide_from_right',
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    } }), _jsx(detail_screen_1.UserDetailScreen, { id: id })] }));
    }
    exports_1("default", Screen);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (detail_screen_1_1) {
                detail_screen_1 = detail_screen_1_1;
            },
            function (expo_router_1_1) {
                expo_router_1 = expo_router_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            }
        ],
        execute: function () {
        }
    };
});
