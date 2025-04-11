System.register(["fs/promises", "path"], function (exports_1, context_1) {
    "use strict";
    var promises_1, path_1;
    var __moduleName = context_1 && context_1.id;
    /**
     * 画像ファイルをアップロードし、保存先の URL を返す関数
     * @param file - アップロードする File オブジェクト
     */
    async function uploadImage(file) {
        if (!(file instanceof File)) {
            throw new Error('Invalid file');
        }
        // アップロード先ディレクトリ（例：プロジェクトルート/public/uploads）
        const uploadDir = path_1.default.join(process.cwd(), 'public', 'uploads');
        await promises_1.default.mkdir(uploadDir, { recursive: true });
        // 衝突防止のためタイムスタンプ付きのファイル名を生成
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path_1.default.join(uploadDir, fileName);
        // File オブジェクトを Buffer に変換して保存
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await promises_1.default.writeFile(filePath, buffer);
        return { url: `/uploads/${fileName}` };
    }
    exports_1("uploadImage", uploadImage);
    /**
     * 指定されたファイルパスの画像を削除する関数
     * @param filePathParam - URL（例：/uploads/xxx.jpg）
     */
    async function deleteImage(filePathParam) {
        // セキュリティ上、必ず /uploads/ から始まるかチェックする
        if (!filePathParam.startsWith('/uploads/')) {
            throw new Error('Invalid file path');
        }
        const fullPath = path_1.default.join(process.cwd(), 'public', filePathParam);
        await promises_1.default.unlink(fullPath);
    }
    exports_1("deleteImage", deleteImage);
    return {
        setters: [
            function (promises_1_1) {
                promises_1 = promises_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            }
        ],
        execute: function () {
        }
    };
});
