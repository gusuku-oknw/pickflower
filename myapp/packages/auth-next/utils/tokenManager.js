System.register(["@react-native-async-storage/async-storage"], function (exports_1, context_1) {
    "use strict";
    var async_storage_1, TOKEN_KEY, setToken, getToken, removeToken;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (async_storage_1_1) {
                async_storage_1 = async_storage_1_1;
            }
        ],
        execute: function () {
            TOKEN_KEY = 'auth_token';
            exports_1("setToken", setToken = async (token) => {
                try {
                    await async_storage_1.default.setItem(TOKEN_KEY, token);
                }
                catch (error) {
                    console.error("setToken error", error);
                    throw error;
                }
            });
            exports_1("getToken", getToken = async () => {
                try {
                    return await async_storage_1.default.getItem(TOKEN_KEY);
                }
                catch (error) {
                    console.error("getToken error", error);
                    return null;
                }
            });
            exports_1("removeToken", removeToken = async () => {
                try {
                    await async_storage_1.default.removeItem(TOKEN_KEY);
                }
                catch (error) {
                    console.error("removeToken error", error);
                    throw error;
                }
            });
        }
    };
});
