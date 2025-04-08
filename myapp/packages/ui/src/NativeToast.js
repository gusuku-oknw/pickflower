System.register(["react/jsx-runtime", "@tamagui/toast", "tamagui"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, toast_1, tamagui_1, NativeToast;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (toast_1_1) {
                toast_1 = toast_1_1;
            },
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
            }
        ],
        execute: function () {
            exports_1("NativeToast", NativeToast = () => {
                const currentToast = toast_1.useToastState();
                if (!currentToast || currentToast.isHandledNatively) {
                    return null;
                }
                return (_jsx(toast_1.Toast, { duration: currentToast.duration, viewportName: currentToast.viewportName, enterStyle: { opacity: 0, scale: 0.5, y: -25 }, exitStyle: { opacity: 0, scale: 1, y: -20 }, y: 0, opacity: 1, scale: 1, animation: "quick", children: _jsxs(tamagui_1.YStack, { py: "$1.5", px: "$2", children: [_jsx(toast_1.Toast.Title, { lineHeight: "$1", children: currentToast.title }), !!currentToast.message && _jsx(toast_1.Toast.Description, { children: currentToast.message })] }) }, currentToast.id));
            });
        }
    };
});
