System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    // packages/app/features/profile/api/profileAPI.ts
    async function fetchUserProfile(userId) {
        // 実際には fetch や axios を用いてサーバーからユーザー情報を取得する例
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
            throw new Error('ユーザー情報の取得に失敗しました');
        }
        return response.json();
    }
    exports_1("fetchUserProfile", fetchUserProfile);
    return {
        setters: [],
        execute: function () {
        }
    };
});
