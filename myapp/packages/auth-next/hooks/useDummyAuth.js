System.register(["react"], function (exports_1, context_1) {
    "use strict";
    // packages/auth-next/hooks/useDummyAuth.tsx
    'use client';
    var react_1, dummyUser, useDummyAuth;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            }
        ],
        execute: function () {
            // ダミーデータとして使用するユーザー情報
            dummyUser = {
                id: 'dummy123',
                name: 'ダミー太郎',
                email: 'dummy@example.com',
                avatarUrl: 'https://dummyimage.com/100x100/000/fff.png&text=Avatar',
                bio: 'これはテスト用のダミーユーザーです。',
            };
            exports_1("useDummyAuth", useDummyAuth = () => {
                const [user, setUser] = react_1.useState(null);
                const [error, setError] = react_1.useState(null);
                const [isLoading, setIsLoading] = react_1.useState(true);
                // マウント時に一定の遅延後、ダミーデータをセットする例
                react_1.useEffect(() => {
                    const timer = setTimeout(() => {
                        setUser(dummyUser);
                        setIsLoading(false);
                    }, 1000); // 1秒後にダミーデータを返す
                    return () => clearTimeout(timer);
                }, []);
                const login = () => {
                    // ダミーのログイン処理（実際にはAPI呼び出しなどを行うところを模擬）
                    console.log('ダミーログインが呼ばれました');
                    // 必要に応じて user の状態を更新することも可能
                    setUser(dummyUser);
                };
                const logout = () => {
                    console.log('ダミーログアウトが呼ばれました');
                    setUser(null);
                };
                return { user, error, isLoading, login, logout };
            });
        }
    };
});
