System.register(["react/jsx-runtime", "react", "../services/authService", "../utils/tokenManager"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, react_1, authService_1, tokenManager_1, AuthContext, AuthProvider, useAuth;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (authService_1_1) {
                authService_1 = authService_1_1;
            },
            function (tokenManager_1_1) {
                tokenManager_1 = tokenManager_1_1;
            }
        ],
        execute: function () {
            AuthContext = react_1.createContext(undefined);
            exports_1("AuthProvider", AuthProvider = ({ children }) => {
                const [userToken, setUserToken] = react_1.useState(null);
                react_1.useEffect(() => {
                    const loadToken = async () => {
                        const token = await tokenManager_1.getToken();
                        setUserToken(token);
                    };
                    loadToken();
                }, []);
                const handleLogin = async () => {
                    try {
                        const token = await authService_1.login(); // Auth0へのログイン処理
                        await tokenManager_1.setToken(token);
                        setUserToken(token);
                    }
                    catch (error) {
                        console.error("ログインエラー:", error);
                    }
                };
                const handleLogout = () => {
                    authService_1.logout();
                    tokenManager_1.removeToken();
                    setUserToken(null);
                };
                const handleRefreshToken = async () => {
                    try {
                        const token = await authService_1.refreshToken();
                        await tokenManager_1.setToken(token);
                        setUserToken(token);
                    }
                    catch (error) {
                        console.error("トークン更新エラー:", error);
                    }
                };
                return (_jsx(AuthContext.Provider, { value: {
                        isAuthenticated: !!userToken,
                        userToken,
                        login: handleLogin,
                        logout: handleLogout,
                        refreshToken: handleRefreshToken,
                    }, children: children }));
            });
            exports_1("useAuth", useAuth = () => {
                const context = react_1.useContext(AuthContext);
                if (context === undefined) {
                    throw new Error("useAuthはAuthProvider内で使用してください");
                }
                return context;
            });
        }
    };
});
