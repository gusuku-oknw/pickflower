System.register(["react/jsx-runtime", "@my/ui"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, ui_1, ToastViewport;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (ui_1_1) {
                ui_1 = ui_1_1;
            }
        ],
        execute: function () {
            exports_1("ToastViewport", ToastViewport = () => {
                return (_jsx(ui_1.ToastViewport, { left: 0, right: 0, top: 10 }));
            });
        }
    };
});
