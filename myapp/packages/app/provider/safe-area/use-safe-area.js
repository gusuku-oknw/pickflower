System.register(["react-native-safe-area-context"], function (exports_1, context_1) {
    "use strict";
    var react_native_safe_area_context_1, useSafeArea;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_native_safe_area_context_1_1) {
                react_native_safe_area_context_1 = react_native_safe_area_context_1_1;
            }
        ],
        execute: function () {
            useSafeArea = react_native_safe_area_context_1.useSafeAreaInsets;
            exports_1("useSafeArea", useSafeArea);
        }
    };
});
