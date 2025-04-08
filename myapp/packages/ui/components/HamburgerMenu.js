System.register(["react/jsx-runtime", "react", "tamagui", "@tamagui/lucide-icons", "solito/navigation", "tamagui/linear-gradient"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1, lucide_icons_1, navigation_1, linear_gradient_1, HamburgerMenu;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (tamagui_1_1) {
                tamagui_1 = tamagui_1_1;
            },
            function (lucide_icons_1_1) {
                lucide_icons_1 = lucide_icons_1_1;
            },
            function (navigation_1_1) {
                navigation_1 = navigation_1_1;
            },
            function (linear_gradient_1_1) {
                linear_gradient_1 = linear_gradient_1_1;
            }
        ],
        execute: function () {
            exports_1("HamburgerMenu", HamburgerMenu = () => {
                const [isOpen, setIsOpen] = react_1.useState(false);
                const [isDarkMode, setIsDarkMode] = react_1.useState(false);
                const theme = tamagui_1.useTheme();
                const router = navigation_1.useRouter();
                const toggleMenu = () => {
                    setIsOpen((prev) => !prev);
                };
                const toggleTheme = () => {
                    setIsDarkMode((prev) => !prev);
                };
                const navigateTo = (route) => {
                    setIsOpen(false);
                    router.push(route);
                };
                const primaryMenuItems = [
                    { icon: lucide_icons_1.Home, label: 'ホーム', route: '/' },
                    { icon: lucide_icons_1.User, label: 'プロフィール', route: '/profile' },
                    { icon: lucide_icons_1.Bell, label: '通知', route: '/notifications' },
                    { icon: lucide_icons_1.Settings, label: '設定', route: '/settings' },
                ];
                return (_jsxs(_Fragment, { children: [_jsx(tamagui_1.AnimatePresence, { children: isOpen && (_jsx(tamagui_1.Stack, { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 999, enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 }, animation: "quick", opacity: 1, onPress: () => setIsOpen(false) })) }), _jsx(tamagui_1.Button, { onPress: toggleMenu, circular: true, size: "$4", bg: isOpen ? 'transparent' : '$background', pressStyle: { scale: 0.9, opacity: 0.8 }, animation: "quick", zIndex: 1001, borderWidth: 1, borderColor: "$borderColor", shadowColor: "$shadowColor", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, children: isOpen ? (_jsx(lucide_icons_1.X, { size: "$3", color: "$color12" })) : (_jsx(lucide_icons_1.Menu, { size: "$3", color: "$color12" })) }), _jsx(tamagui_1.AnimatePresence, { children: isOpen && (_jsx(tamagui_1.Theme, { name: isDarkMode ? "dark" : "light", children: _jsxs(tamagui_1.YStack, { position: "fixed", top: 0, left: 0, bottom: 0, width: "85%", maxWidth: 360, backgroundColor: "$background", zIndex: 1000, enterStyle: { x: -320 }, exitStyle: { x: -320 }, animation: "quick", x: 0, shadowColor: "$shadowColor", shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.2, shadowRadius: 20, children: [_jsx(linear_gradient_1.LinearGradient, { colors: ['$blue8', '#dddddd'], start: [0, 0], end: [1, 1], width: "100%", padding: "$10", paddingTop: "$10", paddingBottom: "$6", children: _jsxs(tamagui_1.XStack, { alignItems: "center", space: "$3", children: [_jsx(tamagui_1.Stack, { width: 50, height: 50, borderRadius: 25, backgroundColor: "$color1", alignItems: "center", justifyContent: "center", overflow: "hidden", children: _jsx(lucide_icons_1.User, { size: "$4", color: "$color12" }) }), _jsxs(tamagui_1.YStack, { children: [_jsx(tamagui_1.H2, { color: "white", fontWeight: "600", fontSize: "$5", children: "\u30B2\u30B9\u30C8" }), _jsx(tamagui_1.Paragraph, { color: "$color1", opacity: 0.9, children: "guest@example.com" })] })] }) }), _jsx(tamagui_1.YStack, { flex: 1, padding: "$2", space: "$1", children: primaryMenuItems.map((item, index) => (_jsx(tamagui_1.Button, { onPress: () => navigateTo(item.route), bg: "transparent", hoverStyle: { bg: '$color3' }, pressStyle: { scale: 0.98, opacity: 0.9 }, animation: "quick", justifyContent: "flex-start", paddingVertical: "$3.5", paddingHorizontal: "$4", borderRadius: "$4", children: _jsxs(tamagui_1.XStack, { alignItems: "center", space: "$3", width: "100%", children: [_jsx(item.icon, { size: "$4", color: "$color11" }), _jsx(tamagui_1.Text, { flex: 1, fontSize: "$4", fontWeight: "500", color: "$color12", children: item.label }), _jsx(lucide_icons_1.ChevronRight, { size: "$3", color: "$color9", opacity: 0.7 })] }) }, index))) }), _jsxs(tamagui_1.XStack, { justifyContent: "space-around", paddingTop: "$3", children: [_jsxs(tamagui_1.Tooltip, { placement: "top", children: [_jsx(tamagui_1.Tooltip.Trigger, { children: _jsx(tamagui_1.Button, { onPress: () => navigateTo('/contact'), bg: "transparent", size: "$5", circular: true, icon: _jsx(lucide_icons_1.MailQuestion, { size: "$5", color: "$color11" }) }) }), _jsxs(tamagui_1.Tooltip.Content, { children: [_jsx(tamagui_1.Tooltip.Arrow, {}), _jsx(tamagui_1.Paragraph, { size: "$2", children: "\u304A\u554F\u3044\u5408\u308F\u305B" })] })] }), _jsxs(tamagui_1.Tooltip, { placement: "top", children: [_jsx(tamagui_1.Tooltip.Trigger, { children: _jsx(tamagui_1.Button, { onPress: () => navigateTo('/terms'), bg: "transparent", size: "$5", circular: true, icon: _jsx(lucide_icons_1.ScrollText, { size: "$5", color: "$color11" }) }) }), _jsxs(tamagui_1.Tooltip.Content, { children: [_jsx(tamagui_1.Tooltip.Arrow, {}), _jsx(tamagui_1.Paragraph, { size: "$2", children: "\u5229\u7528\u898F\u7D04" })] })] }), _jsxs(tamagui_1.Tooltip, { placement: "top", children: [_jsx(tamagui_1.Tooltip.Trigger, { children: _jsx(tamagui_1.Button, { onPress: () => {
                                                                    console.log('ログアウト処理');
                                                                    navigateTo('/logout');
                                                                }, bg: "transparent", size: "$5", circular: true, icon: _jsx(lucide_icons_1.UserX, { size: "$5", color: "$color11" }) }) }), _jsxs(tamagui_1.Tooltip.Content, { children: [_jsx(tamagui_1.Tooltip.Arrow, {}), _jsx(tamagui_1.Paragraph, { size: "$2", children: "\u30ED\u30B0\u30A2\u30A6\u30C8" })] })] })] }), _jsxs(tamagui_1.YStack, { padding: "$3", space: "$4", children: [_jsx(tamagui_1.Separator, {}), _jsx(tamagui_1.Button, { onPress: toggleTheme, bg: "transparent", hoverStyle: { bg: '$color3' }, pressStyle: { scale: 0.98 }, animation: "quick", justifyContent: "flex-start", paddingVertical: "$3", paddingHorizontal: "$4", borderRadius: "$4", children: _jsxs(tamagui_1.XStack, { alignItems: "center", space: "$3", width: "100%", children: [isDarkMode ? (_jsx(lucide_icons_1.Sun, { size: "$4", color: "$color11" })) : (_jsx(lucide_icons_1.Moon, { size: "$4", color: "$color11" })), _jsx(tamagui_1.Text, { fontSize: "$4", fontWeight: "500", color: "$color12", children: isDarkMode ? 'ライトモード' : 'ダークモード' })] }) }), _jsx(tamagui_1.Paragraph, { textAlign: "center", fontSize: "$3", color: "$color10", paddingBottom: "$2", children: "v1.0.0" })] })] }) })) })] }));
            });
            exports_1("default", HamburgerMenu);
        }
    };
});
