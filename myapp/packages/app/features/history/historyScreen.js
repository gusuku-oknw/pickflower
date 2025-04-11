System.register(["react/jsx-runtime", "react", "tamagui", "@tamagui/lucide-icons"], function (exports_1, context_1) {
    'use client';
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1, lucide_icons_1;
    var __moduleName = context_1 && context_1.id;
    function HistoryScreen() {
        const [history, setHistory] = react_1.useState([
            {
                id: 1,
                caption: '秋の風景。散歩中に見つけた公園の紅葉が美しかったので撮影してみました。',
                imageUrl: '/sample1.jpg',
                date: '2023-10-01',
                likes: 128,
                comments: 24,
                saved: true
            },
            {
                id: 2,
                caption: 'カフェで優雅なランチタイム🍴 自家製パスタが絶品でした！',
                imageUrl: '/sample2.jpg',
                date: '2023-10-02',
                likes: 87,
                comments: 11,
                saved: false
            },
            {
                id: 3,
                caption: '新しい投稿テスト。カメラの設定を変えて撮影してみました。この光の当たり方が好きです✨',
                imageUrl: '/sample3.jpg',
                date: '2023-10-03',
                likes: 213,
                comments: 32,
                saved: true
            },
        ]);
        const [selectedPost, setSelectedPost] = react_1.useState(null);
        const [showOptions, setShowOptions] = react_1.useState(false);
        const handleDeletePost = (id) => {
            setHistory(prev => prev.filter(item => item.id !== id));
            setShowOptions(false);
        };
        const toggleSaved = (id) => {
            setHistory(prev => prev.map(item => item.id === id ? { ...item, saved: !item.saved } : item));
        };
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short'
            }).format(date);
        };
        return (_jsxs(tamagui_1.Theme, { name: "light", children: [_jsx(tamagui_1.ScrollView, { flex: 1, backgroundColor: "$gray1", children: _jsxs(tamagui_1.YStack, { padding: "$4", space: "$5", children: [_jsxs(tamagui_1.YStack, { space: "$2", paddingBottom: "$2", children: [_jsxs(tamagui_1.XStack, { alignItems: "center", justifyContent: "space-between", children: [_jsx(tamagui_1.H2, { fontWeight: "600", children: "\u6295\u7A3F\u5C65\u6B74" }), _jsx(tamagui_1.XStack, { space: "$2", children: _jsx(tamagui_1.Button, { icon: lucide_icons_1.Calendar, circular: true, chromeless: true, size: "$3", backgroundColor: "$gray3", color: "$gray11" }) })] }), _jsx(tamagui_1.Paragraph, { color: "$gray10", children: "\u3042\u306A\u305F\u306E\u601D\u3044\u51FA\u3092\u632F\u308A\u8FD4\u308A\u307E\u3057\u3087\u3046" }), _jsx(tamagui_1.Separator, { marginTop: "$2" })] }), history.length === 0 ? (_jsxs(tamagui_1.YStack, { height: 300, justifyContent: "center", alignItems: "center", backgroundColor: "$gray2", borderRadius: "$6", padding: "$6", children: [_jsx(tamagui_1.Stack, { width: 100, height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "$gray3", borderRadius: "$10", marginBottom: "$4", children: _jsx(lucide_icons_1.Calendar, { size: "$6", color: "$gray10" }) }), _jsx(tamagui_1.Paragraph, { textAlign: "center", color: "$gray10", marginBottom: "$2", fontSize: "$5", fontWeight: "500", children: "\u6295\u7A3F\u5C65\u6B74\u306F\u3042\u308A\u307E\u305B\u3093" }), _jsx(tamagui_1.Text, { color: "$gray9", textAlign: "center", children: "\u65B0\u3057\u3044\u6295\u7A3F\u3092\u4F5C\u6210\u3057\u3066\u601D\u3044\u51FA\u3092\u6B8B\u3057\u307E\u3057\u3087\u3046" }), _jsx(tamagui_1.Button, { marginTop: "$5", theme: "blue", fontSize: "$3", borderRadius: "$6", children: "\u65B0\u898F\u6295\u7A3F\u3092\u4F5C\u6210" })] })) : (_jsx(tamagui_1.YStack, { space: "$5", children: history.map((item) => (_jsxs(tamagui_1.Card, { elevate: true, size: "$4", bordered: false, animation: "bouncy", scale: 1, pressStyle: {
                                        scale: 0.98,
                                    }, borderRadius: "$6", backgroundColor: "white", overflow: "hidden", children: [_jsxs(tamagui_1.XStack, { padding: "$3", alignItems: "center", justifyContent: "space-between", children: [_jsxs(tamagui_1.XStack, { space: "$2", alignItems: "center", children: [_jsxs(tamagui_1.Avatar, { circular: true, size: "$3", backgroundColor: "$blue5", children: [_jsx(tamagui_1.Avatar.Image, { source: { uri: '/avatar.jpg' } }), _jsx(tamagui_1.Avatar.Fallback, { backgroundColor: "$blue9" })] }), _jsx(tamagui_1.Text, { fontWeight: "500", children: "\u30DE\u30A4\u30A2\u30AB\u30A6\u30F3\u30C8" })] }), _jsx(tamagui_1.Button, { icon: lucide_icons_1.MoreHorizontal, circular: true, chromeless: true, size: "$2", onPress: () => {
                                                        setSelectedPost(item);
                                                        setShowOptions(true);
                                                    } })] }), _jsx(tamagui_1.Image, { source: { uri: item.imageUrl }, width: "100%", height: 300, resizeMode: "cover" }), _jsxs(tamagui_1.XStack, { padding: "$3", justifyContent: "space-between", children: [_jsxs(tamagui_1.XStack, { space: "$3", children: [_jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.Heart, { size: "$1.5", color: item.likes > 100 ? '$red10' : '$gray10' }), circular: true, chromeless: true, children: _jsx(tamagui_1.Text, { color: "$gray11", marginLeft: "$1", children: item.likes }) }), _jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.MessageCircle, { size: "$1.5", color: "$gray10" }), circular: true, chromeless: true, children: _jsx(tamagui_1.Text, { color: "$gray11", marginLeft: "$1", children: item.comments }) }), _jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.Share2, { size: "$1.5", color: "$gray10" }), circular: true, chromeless: true })] }), _jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.Bookmark, { size: "$1.5", color: item.saved ? '$blue10' : '$gray10', fill: item.saved ? '$blue10' : 'transparent' }), circular: true, chromeless: true, onPress: () => toggleSaved(item.id) })] }), _jsxs(tamagui_1.YStack, { padding: "$3", paddingTop: "$0", space: "$2", children: [_jsx(tamagui_1.Text, { numberOfLines: 2, color: "$gray12", lineHeight: 22, children: item.caption }), _jsxs(tamagui_1.XStack, { alignItems: "center", space: "$2", children: [_jsx(lucide_icons_1.Calendar, { size: "$1", color: "$gray9" }), _jsx(tamagui_1.Text, { fontSize: "$2", color: "$gray9", children: formatDate(item.date) })] })] })] }, item.id))) }))] }) }), _jsxs(tamagui_1.Sheet, { modal: true, open: showOptions, onOpenChange: setShowOptions, snapPoints: [40], dismissOnSnapToBottom: true, children: [_jsx(tamagui_1.Sheet.Overlay, { animation: "lazy", enterStyle: { opacity: 0 }, exitStyle: { opacity: 0 } }), _jsxs(tamagui_1.Sheet.Frame, { padding: "$4", space: "$4", children: [_jsx(tamagui_1.H2, { textAlign: "center", fontWeight: "600", marginBottom: "$2", children: "\u6295\u7A3F\u30AA\u30D7\u30B7\u30E7\u30F3" }), _jsx(tamagui_1.Separator, {}), _jsxs(tamagui_1.YStack, { space: "$3", marginTop: "$2", children: [_jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.Pen, { size: "$1.5", color: "" }), size: "$4.5", fontWeight: "700", justifyContent: "flex-start", chromeless: true, pressStyle: { scale: 0.98, opacity: 0.8 }, children: "\u6295\u7A3F\u3092\u7DE8\u96C6" }), _jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.Download, { size: "$1.5", color: "$blue10" }), size: "$4", fontWeight: "500", justifyContent: "flex-start", chromeless: true, pressStyle: { scale: 0.98, opacity: 0.8 }, children: _jsx(tamagui_1.Text, { color: "$blue10", children: "\u753B\u50CF\u3092\u4FDD\u5B58" }) }), _jsx(tamagui_1.Button, { icon: _jsx(lucide_icons_1.Trash2, { size: "$1.5", color: "$red10" }), size: "$4", fontWeight: "500", justifyContent: "flex-start", chromeless: true, pressStyle: { scale: 0.98, opacity: 0.8 }, onPress: () => selectedPost && handleDeletePost(selectedPost.id), children: _jsx(tamagui_1.Text, { color: "$red10", children: "\u6295\u7A3F\u3092\u524A\u9664" }) })] }), _jsx(tamagui_1.Button, { size: "$4", theme: "gray", marginTop: "$2", onPress: () => setShowOptions(false), children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })] })] })] }));
    }
    exports_1("HistoryScreen", HistoryScreen);
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
            }
        ],
        execute: function () {
        }
    };
});
