System.register(["react/jsx-runtime", "@my/ui", "@tamagui/lucide-icons", "solito/navigation"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, ui_1, lucide_icons_1, navigation_1;
    var __moduleName = context_1 && context_1.id;
    function UserDetailScreen({ id }) {
        const router = navigation_1.useRouter();
        if (!id) {
            return null;
        }
        return (_jsxs(ui_1.YStack, { f: 1, jc: "center", ai: "center", gap: "$4", bg: "$background", children: [_jsx(ui_1.Paragraph, { ta: "center", fow: "700", col: "$blue10", children: `User ID: ${id}` }), _jsx(ui_1.Button, { icon: lucide_icons_1.ChevronLeft, onPress: () => router.back(), children: "Go Home" })] }));
    }
    exports_1("UserDetailScreen", UserDetailScreen);
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (ui_1_1) {
                ui_1 = ui_1_1;
            },
            function (lucide_icons_1_1) {
                lucide_icons_1 = lucide_icons_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            }
        ],
        execute: function () {
        }
    };
});
