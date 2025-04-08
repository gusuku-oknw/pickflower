System.register(["tamagui", "@tamagui/toast", "./MyComponent", "@my/config", "./CustomToast", "./SwitchThemeButton", "./SwitchRouterButton"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "config": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (tamagui_1_1) {
                exportStar_1(tamagui_1_1);
            },
            function (toast_1_1) {
                exportStar_1(toast_1_1);
            },
            function (MyComponent_1_1) {
                exportStar_1(MyComponent_1_1);
            },
            function (config_1_1) {
                exports_1({
                    "config": config_1_1["config"]
                });
            },
            function (CustomToast_1_1) {
                exportStar_1(CustomToast_1_1);
            },
            function (SwitchThemeButton_1_1) {
                exportStar_1(SwitchThemeButton_1_1);
            },
            function (SwitchRouterButton_1_1) {
                exportStar_1(SwitchRouterButton_1_1);
            }
        ],
        execute: function () {
        }
    };
});
