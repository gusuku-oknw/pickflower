System.register(["react/jsx-runtime", "react", "tamagui", "../../../../packages/auth-next/hooks/useSupabaseAuth"], function (exports_1, context_1) {
    // packages/app/features/profile/ProfileScreen.tsx
    'use client';
    "use strict";
    var jsx_runtime_1, react_1, tamagui_1, useSupabaseAuth_1;
    var __moduleName = context_1 && context_1.id;
    function ProfileScreen() {
        const { user, loading, error, signIn, signOut } = useSupabaseAuth_1.useSupabaseAuth();
        const [errorMessage, setErrorMessage] = react_1.useState(null);
        const handleSignIn = async () => {
            try {
                // 仮の値ですが、実際はフォームから入力値を取得
                await signIn('derblack461@gmail.com', 'j8DJdHfE');
                setErrorMessage(null);
            }
            catch (error) {
                // エラー内容に応じたメッセージを設定
                if (error.message.includes("Email not confirmed")) {
                    setErrorMessage("メールアドレスの確認が完了していません。受信トレイの確認と確認リンクのクリックをお願いします。");
                }
                else {
                    setErrorMessage("ログインに失敗しました。入力内容をご確認ください。");
                }
            }
        };
        if (loading) {
            return (_jsx(tamagui_1.YStack, { flex: 1, padding: "$4", alignItems: "center", justifyContent: "center", children: _jsx(tamagui_1.Spinner, {}) }));
        }
        if (error || !user) {
            return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", alignItems: "center", justifyContent: "center", children: [_jsx(tamagui_1.Paragraph, { color: "$color11", children: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F" }), _jsx(tamagui_1.Button, { onPress: () => {
                            // 仮のログイン処理：適宜サインインフォーム等に差し替えてください
                            signIn('derblack461@gmail.com', 'j8DJdHfE');
                        }, children: "\u30ED\u30B0\u30A4\u30F3" })] }));
        }
        return (_jsxs(tamagui_1.YStack, { flex: 1, padding: "$4", space: true, children: [_jsxs(tamagui_1.YStack, { alignItems: "center", space: true, children: [_jsx(tamagui_1.Avatar, { size: "$10", src: 
                            // Supabase Auth のユーザーオブジェクトでは、ユーザー情報は user_metadata に含まれる場合が多い
                            user.user_metadata?.avatar_url ||
                                'https://dummyimage.com/100x100/000/fff.png&text=Avatar', borderWidth: 2, borderColor: "$color10", circular: true }), _jsx(tamagui_1.Paragraph, { fontSize: "$6", fontWeight: "bold", children: user.user_metadata?.full_name || user.email })] }), _jsx(tamagui_1.Paragraph, { children: user.user_metadata?.bio || 'プロフィール情報はありません' }), _jsx(tamagui_1.Paragraph, { color: "$color11", children: user.email }), _jsx(tamagui_1.Button, { onPress: signOut, children: "\u30ED\u30B0\u30A2\u30A6\u30C8" })] }));
    }
    exports_1("ProfileScreen", ProfileScreen);
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
            function (useSupabaseAuth_1_1) {
                useSupabaseAuth_1 = useSupabaseAuth_1_1;
            }
        ],
        execute: function () {
        }
    };
});
