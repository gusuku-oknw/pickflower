System.register(["react/jsx-runtime", "react", "tamagui", "@tamagui/lucide-icons", "@tamagui/toast"], function (exports_1, context_1) {
    // packages/app/features/post/postScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1, lucide_icons_1, toast_1;
    var __moduleName = context_1 && context_1.id;
    /* =================================================== */
    function PostScreen() {
        /* ─────────── state & refs ─────────── */
        const [caption, setCaption] = react_1.useState('');
        const [location, setLocation] = react_1.useState('');
        const [activeTab, setActiveTab] = react_1.useState('camera');
        const [uploadProgress, setUploadProgress] = react_1.useState(0);
        const [uploading, setUploading] = react_1.useState(false);
        const [mediaFiles, setMediaFiles] = react_1.useState([]);
        const galleryInputRef = react_1.useRef(null);
        const cameraInputRef = react_1.useRef(null);
        const toast = toast_1.useToastController();
        /* ─────────── upload animation ─────────── */
        react_1.useEffect(() => {
            if (uploading && uploadProgress < 100) {
                const t = setTimeout(() => setUploadProgress(p => Math.min(p + 10, 100)), 300);
                return () => clearTimeout(t);
            }
            if (uploading && uploadProgress === 100) {
                setUploading(false);
                setUploadProgress(0);
                toast.show('投稿が完了しました', { message: 'フォロワーに表示されます', duration: 3000 });
                setMediaFiles([]);
                setCaption('');
                setLocation('');
            }
        }, [uploading, uploadProgress, toast]);
        /* =============== 画像追加 =============== */
        const handleFileChange = async (e) => {
            const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
            if (files.length === 0)
                return;
            try {
                const uploaded = await Promise.all(files.map(async (file) => {
                    const fd = new FormData();
                    fd.append('file', file); // FastAPI 側は "file" を期待
                    const res = await fetch('http://localhost:8000/upload', {
                        method: 'POST',
                        body: fd,
                    });
                    if (!res.ok)
                        throw new Error('upload failed');
                    const { url } = await res.json();
                    return { file, url }; // ここで {file, url} を返す
                }));
                setMediaFiles(prev => [...prev, ...uploaded]);
                toast.show('画像が追加されました', {
                    message: `${uploaded.length} 枚の画像をアップロードしました`,
                    duration: 2000,
                });
            }
            catch (err) {
                console.error(err);
                toast.show('アップロードに失敗しました', { duration: 3000, native: true });
            }
        };
        /* =============== 画像削除 =============== */
        const removeImage = async (idx) => {
            const target = mediaFiles[idx];
            if (!target)
                return;
            try {
                // FastAPI に削除エンドポイントを用意している場合はそちらへ
                const res = await fetch(`http://localhost:8000/delete?path=${encodeURIComponent(target.url)}`, {
                    method: 'DELETE',
                });
                if (!res.ok)
                    throw new Error('delete failed');
                setMediaFiles(prev => prev.filter((_, i) => i !== idx));
            }
            catch (err) {
                console.error(err);
                toast.show('削除に失敗しました', { duration: 3000, native: true });
            }
        };
        /* =============== 投稿 =============== */
        const handlePost = async () => {
            if (mediaFiles.length === 0) {
                toast.show('画像が必要です', { message: '少なくとも1枚の画像を追加してください', duration: 3000, native: true });
                return;
            }
            setUploading(true);
            const body = JSON.stringify({
                images: mediaFiles.map(m => m.url),
                caption,
                location,
            });
            try {
                await fetch('/api/insta/post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body,
                });
            }
            catch {
                toast.show('投稿に失敗しました', { message: '再度お試しください', native: true });
                setUploading(false);
            }
        };
        /* =============== UI =============== */
        return (_jsxs(toast_1.ToastProvider, { swipeDirection: "right", children: [_jsx(tamagui_1.YStack, { flex: 1, backgroundColor: "$background", padding: "$4", children: _jsxs(tamagui_1.YStack, { space: "$4", maxWidth: 600, marginHorizontal: "auto", width: "100%", children: [_jsxs(tamagui_1.XStack, { justifyContent: "space-between", alignItems: "center", children: [_jsx(tamagui_1.H2, { fontWeight: "600", children: "\u65B0\u898F\u6295\u7A3F" }), _jsx(tamagui_1.Button, { chromeless: true, circular: true, size: "$3", icon: _jsx(lucide_icons_1.X, { size: "$1.5" }) })] }), _jsx(tamagui_1.Separator, {}), _jsx(tamagui_1.XStack, { backgroundColor: "$gray3", borderRadius: "$6", overflow: "hidden", marginVertical: "$2", children: ['camera', 'gallery'].map(tab => (_jsx(tamagui_1.Button, { flex: 1, size: "$4", backgroundColor: activeTab === tab ? '$color5' : 'transparent', color: activeTab === tab ? '$color12' : '$color11', onPress: () => setActiveTab(tab), borderRadius: 0, fontWeight: activeTab === tab ? '600' : '400', children: _jsxs(tamagui_1.XStack, { space: "$2", alignItems: "center", children: [tab === 'camera' ? _jsx(lucide_icons_1.Camera, { size: "$1" }) : _jsx(lucide_icons_1.Image, { size: "$1" }), _jsx(tamagui_1.Text, { children: tab === 'camera' ? 'カメラ' : 'ギャラリー' })] }) }, tab))) }), _jsx(tamagui_1.YStack, { borderWidth: 1, borderColor: "$gray5", borderRadius: "$6", backgroundColor: "$gray1", padding: "$5", minHeight: 200, justifyContent: "center", alignItems: "center", space: "$4", children: mediaFiles.length === 0 ? (_jsxs(_Fragment, { children: [_jsx(tamagui_1.Circle, { size: 80, backgroundColor: "$gray3", alignItems: "center", justifyContent: "center", children: activeTab === 'camera'
                                                ? _jsx(lucide_icons_1.Camera, { size: "$5", color: "$gray11" })
                                                : _jsx(lucide_icons_1.Image, { size: "$5", color: "$gray11" }) }), _jsxs(tamagui_1.YStack, { alignItems: "center", space: "$2", children: [_jsx(tamagui_1.Paragraph, { color: "$gray11", children: activeTab === 'camera' ? 'カメラで撮影してください' : 'ギャラリーから画像を選択' }), _jsx(tamagui_1.Button, { size: "$3", theme: "blue", borderRadius: "$6", onPress: () => activeTab === 'camera'
                                                        ? cameraInputRef.current?.click()
                                                        : galleryInputRef.current?.click(), children: activeTab === 'camera' ? '写真を撮影' : '写真を選択' })] })] })) : (_jsxs(tamagui_1.YStack, { width: "100%", space: "$4", children: [_jsxs(tamagui_1.XStack, { justifyContent: "space-between", alignItems: "center", children: [_jsxs(tamagui_1.Text, { color: "$gray11", fontSize: "$3", fontWeight: "500", children: ["\u9078\u629E\u6E08\u307F: ", mediaFiles.length, " \u679A"] }), _jsx(tamagui_1.Button, { size: "$2", theme: "blue", iconAfter: _jsx(lucide_icons_1.Plus, { size: "$1" }), onPress: () => activeTab === 'camera'
                                                        ? cameraInputRef.current?.click()
                                                        : galleryInputRef.current?.click(), children: "\u8FFD\u52A0" })] }), _jsx(tamagui_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, children: _jsx(tamagui_1.XStack, { space: "$3", padding: "$2.5", children: mediaFiles.map(({ file }, idx) => (_jsxs(tamagui_1.Stack, { position: "relative", children: [_jsx(tamagui_1.Image, { source: { uri: URL.createObjectURL(file) }, width: 120, height: 120, borderRadius: "$4" }), _jsx(tamagui_1.Button, { position: "absolute", top: -8, right: -8, size: "$2", circular: true, icon: lucide_icons_1.Trash2, theme: "red", onPress: () => removeImage(idx) })] }, idx))) }) })] })) }), _jsx("input", { ref: galleryInputRef, type: "file", accept: "image/*", multiple: true, style: { display: 'none' }, onChange: handleFileChange }), _jsx("input", { ref: cameraInputRef, type: "file", accept: "image/*", capture: "environment", style: { display: 'none' }, onChange: handleFileChange }), _jsxs(tamagui_1.YStack, { space: "$3", children: [_jsx(tamagui_1.TextArea, { placeholder: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u3092\u5165\u529B...", value: caption, onChangeText: setCaption, minHeight: 100, borderColor: "$gray5", borderWidth: 1, borderRadius: "$4", padding: "$3", backgroundColor: "$gray1" }), _jsxs(tamagui_1.XStack, { space: "$3", flexWrap: "wrap", children: [_jsx(tamagui_1.Button, { size: "$3", theme: "gray", icon: lucide_icons_1.MapPin, chromeless: true, children: location || '場所を追加' }), _jsx(tamagui_1.Button, { size: "$3", theme: "gray", icon: lucide_icons_1.Tag, chromeless: true, children: "\u30BF\u30B0\u4ED8\u3051" }), _jsx(tamagui_1.Button, { size: "$3", theme: "gray", icon: lucide_icons_1.Smile, chromeless: true, children: "\u7D75\u6587\u5B57" })] })] }), _jsxs(tamagui_1.Sheet, { modal: true, open: uploading, snapPoints: [30], disableDrag: true, children: [_jsx(tamagui_1.Sheet.Overlay, { backgroundColor: "$color1", opacity: 0.5 }), _jsx(tamagui_1.Sheet.Frame, { padding: "$4", alignItems: "center", justifyContent: "center", children: _jsxs(tamagui_1.YStack, { space: "$4", width: "100%", alignItems: "center", children: [_jsx(tamagui_1.Stack, { width: "100%", height: 6, backgroundColor: "$gray4", borderRadius: "$10", overflow: "hidden", children: _jsx(tamagui_1.Stack, { colors: ['$blue8', '$purple8'], start: [0, 0], end: [1, 0], width: `${uploadProgress}%`, height: "100%" }) }), _jsxs(tamagui_1.Text, { fontWeight: "500", children: ["\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D: ", uploadProgress, "%"] })] }) })] }), _jsxs(tamagui_1.Button, { size: "$5", theme: "blue", icon: _jsx(lucide_icons_1.Upload, { size: "$1.5" }), onPress: handlePost, disabled: uploading || mediaFiles.length === 0, opacity: mediaFiles.length === 0 ? 0.5 : 1, marginTop: "$2", borderRadius: "$6", children: [_jsx(tamagui_1.Stack, { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "$6", overflow: "hidden", zIndex: -1, pointerEvents: "none", children: _jsx(tamagui_1.Stack, { colors: ['$blue9', '$purple9'], start: [0, 0], end: [1, 0], fullscreen: true }) }), "\u6295\u7A3F\u3059\u308B"] })] }) }), _jsx(toast_1.ToastViewport, {})] }));
    }
    exports_1("PostScreen", PostScreen);
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
            function (toast_1_1) {
                toast_1 = toast_1_1;
            }
        ],
        execute: function () {
        }
    };
});
