System.register(["react/jsx-runtime", "@my/ui", "@tamagui/lucide-icons", "react", "solito/navigation"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, ui_1, lucide_icons_1, react_1, navigation_1;
    var __moduleName = context_1 && context_1.id;
    function HomeScreen({ pagesMode = false }) {
        const linkTarget = pagesMode ? '/pages-example-user' : '/user';
        const linkProps = navigation_1.useLink({
            href: `${linkTarget}/nate`,
        });
        return (_jsxs(ui_1.YStack, { flex: 1, justify: "center", items: "center", gap: "$8", p: "$4", bg: "$background", children: [_jsxs(ui_1.YStack, { gap: "$4", children: [_jsx(ui_1.H1, { text: "center", color: "$color12", children: "Welcome to Tamagui." }), _jsx(ui_1.Paragraph, { color: "$color10", text: "center", children: "Here's a basic starter to show navigating from one screen to another." }), _jsx(ui_1.Separator, {}), _jsx(ui_1.Paragraph, { text: "center", children: "This screen uses the same code on Next.js and React Native." }), _jsx(ui_1.Separator, {})] }), _jsx(ui_1.Button, { ...linkProps, children: "Link to user" }), _jsx(SheetDemo, {})] }));
    }
    exports_1("HomeScreen", HomeScreen);
    function SheetDemo() {
        const toast = ui_1.useToastController();
        const [open, setOpen] = react_1.useState(false);
        const [position, setPosition] = react_1.useState(0);
        return (_jsxs(_Fragment, { children: [_jsx(ui_1.Button, { size: "$6", icon: open ? lucide_icons_1.ChevronDown : lucide_icons_1.ChevronUp, circular: true, onPress: () => setOpen((x) => !x) }), _jsxs(ui_1.Sheet, { modal: true, animation: "medium", open: open, onOpenChange: setOpen, snapPoints: [80], position: position, onPositionChange: setPosition, dismissOnSnapToBottom: true, children: [_jsx(ui_1.Sheet.Overlay, { bg: "$shadow4", animation: "lazy", enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 } }), _jsx(ui_1.Sheet.Handle, { bg: "$color8" }), _jsxs(ui_1.Sheet.Frame, { items: "center", justify: "center", gap: "$10", bg: "$color2", children: [_jsxs(ui_1.XStack, { gap: "$2", children: [_jsx(ui_1.Paragraph, { text: "center", children: "Made by" }), _jsx(ui_1.Anchor, { color: "$blue10", href: "https://twitter.com/natebirdman", target: "_blank", children: "@natebirdman," }), _jsx(ui_1.Anchor, { color: "$blue10", href: "https://github.com/tamagui/tamagui", target: "_blank", rel: "noreferrer", children: "give it a \u2B50\uFE0F" })] }), _jsx(ui_1.Button, { size: "$6", circular: true, icon: lucide_icons_1.ChevronDown, onPress: () => {
                                        setOpen(false);
                                        toast.show('Sheet closed!', {
                                            message: 'Just showing how toast works...',
                                        });
                                    } })] })] })] }));
    }
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
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            }
        ],
        execute: function () {
        }
    };
});
