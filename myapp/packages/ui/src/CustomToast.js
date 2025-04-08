System.register(["react/jsx-runtime", "expo-constants", "./NativeToast"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, expo_constants_1, NativeToast_1, isExpo, CustomToast;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (expo_constants_1_1) {
                expo_constants_1 = expo_constants_1_1;
            },
            function (NativeToast_1_1) {
                NativeToast_1 = NativeToast_1_1;
            }
        ],
        execute: function () {
            isExpo = expo_constants_1.default.executionEnvironment === expo_constants_1.ExecutionEnvironment.StoreClient;
            exports_1("CustomToast", CustomToast = () => {
                if (isExpo) {
                    return null;
                }
                return _jsx(NativeToast_1.NativeToast, {});
            });
        }
    };
});
