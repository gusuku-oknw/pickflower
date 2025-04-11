System.register(["react-native-auth0"], function (exports_1, context_1) {
    "use strict";
    var react_native_auth0_1, auth0, login, logout, refreshToken;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_native_auth0_1_1) {
                react_native_auth0_1 = react_native_auth0_1_1;
            }
        ],
        execute: function () {
            auth0 = new react_native_auth0_1.default({
                domain: 'YOUR_AUTH0_DOMAIN', // ご自身のAuth0ドメインに置き換えてください
                clientId: 'YOUR_AUTH0_CLIENT_ID' // ご自身のクライアントIDに置き換えてください
            });
            // ログイン処理
            exports_1("login", login = async () => {
                try {
                    const credentials = await auth0.webAuth.authorize({
                        scope: 'openid profile email',
                        audience: 'https://YOUR_AUTH0_DOMAIN/userinfo'
                    });
                    // ここでは取得したアクセストークンを返しています
                    return credentials.accessToken;
                }
                catch (error) {
                    console.error("login error", error);
                    throw error;
                }
            });
            // ログアウト処理
            exports_1("logout", logout = () => {
                auth0.webAuth.clearSession({})
                    .then(success => {
                    console.log("ログアウト完了");
                })
                    .catch(error => {
                    console.error("logout error", error);
                });
            });
            // トークンのリフレッシュ処理（必要に応じて実装）
            exports_1("refreshToken", refreshToken = async () => {
                try {
                    // 実際の実装ではリフレッシュトークンを利用して新しいアクセストークンを取得します
                    // 例: const newCreds = await auth0.auth-native.refreshToken({ refreshToken: YOUR_REFRESH_TOKEN });
                    //     return newCreds.accessToken;
                    // サンプルとして固定のトークン文字列を返す例
                    return "NEW_ACCESS_TOKEN";
                }
                catch (error) {
                    console.error("refreshToken error", error);
                    throw error;
                }
            });
        }
    };
});
