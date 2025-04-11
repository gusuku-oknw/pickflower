System.register(["next/server", "fs/promises", "path"], function (exports_1, context_1) {
    "use strict";
    var server_1, promises_1, path_1;
    var __moduleName = context_1 && context_1.id;
    async function POST(req) {
        try {
            const formData = await req.formData();
            const file = formData.get('media');
            if (!file || !(file instanceof File)) {
                return server_1.NextResponse.json({ message: 'ファイルが見つかりませんでした' }, { status: 400 });
            }
            const uploadDir = path_1.default.join(process.cwd(), 'public', 'uploads');
            await promises_1.default.mkdir(uploadDir, { recursive: true });
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path_1.default.join(uploadDir, fileName);
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            await promises_1.default.writeFile(filePath, buffer);
            return server_1.NextResponse.json({ url: `/uploads/${fileName}`, message: 'アップロード完了' }, { status: 201 });
        }
        catch (error) {
            console.error('画像アップロードエラー:', error);
            return server_1.NextResponse.json({ message: 'アップロード中にエラーが発生しました' }, { status: 500 });
        }
    }
    exports_1("POST", POST);
    async function DELETE(req) {
        try {
            const { searchParams } = new URL(req.url);
            const filePathParam = searchParams.get('path');
            if (!filePathParam || !filePathParam.startsWith('/uploads/')) {
                return server_1.NextResponse.json({ message: '不正なパスです' }, { status: 400 });
            }
            const fullPath = path_1.default.join(process.cwd(), 'public', filePathParam);
            await promises_1.default.unlink(fullPath);
            return server_1.NextResponse.json({ message: '削除完了' }, { status: 200 });
        }
        catch (error) {
            console.error('画像削除エラー:', error);
            return server_1.NextResponse.json({ message: '削除中にエラーが発生しました' }, { status: 500 });
        }
    }
    exports_1("DELETE", DELETE);
    return {
        setters: [
            function (server_1_1) {
                server_1 = server_1_1;
            },
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
