// packages/api-logic/src/post.ts
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * 投稿作成処理（DB 登録などをシミュレーション）
     * @param data - 投稿データ（画像 URL、キャプション、場所）
     * @returns 作成された投稿データ（ここではそのまま返す）
     */
    async function createPost(data) {
        // 本来はデータベースへの登録処理を行う。
        // ここではシンプルに受け取ったデータに成功メッセージを追加して返す。
        return {
            ...data,
            message: '投稿が完了しました',
        };
    }
    exports_1("createPost", createPost);
    return {
        setters: [],
        execute: function () {
        }
    };
});
