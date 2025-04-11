System.register(["next/server", "fs/promises", "path"], function (exports_1, context_1) {
    "use strict";
    var server_1, promises_1, path_1, config;
    var __moduleName = context_1 && context_1.id;
    /**
     * 画像アップロード用 API
     * 期待する multipart/form-data:
     *  ├─ media0, media1, ... : File
     *  ├─ caption             : string
     *  └─ location            : string (任意)
     */
    async function POST(req) {
        try {
            // ----------- 1) フォームデータを取得 -----------
            const formData = await req.formData();
            // ----------- 2) 画像ファイルを抽出 -----------
            const files = [];
            for (const [key, value] of formData.entries()) {
                if (value instanceof File && key.startsWith('media')) {
                    files.push(value);
                }
            }
            if (files.length === 0) {
                return server_1.NextResponse.json({ message: '画像が送信されていません' }, { status: 400 });
            }
            // ----------- 3) キャプション等を取得 -----------
            const caption = formData.get('caption')?.toString() ?? '';
            const location = formData.get('location')?.toString() ?? '';
            // ----------- 4) 画像を保存 -----------
            const uploadDir = path_1.default.join(process.cwd(), 'public', 'uploads');
            await promises_1.default.mkdir(uploadDir, { recursive: true });
            // 画像ごとに保存し、保存先パスを収集
            const savedPaths = [];
            for (const file of files) {
                // ファイル名が衝突しないようタイムスタンプを付与
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = path_1.default.join(uploadDir, fileName);
                // File → Buffer
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                await promises_1.default.writeFile(filePath, buffer);
                savedPaths.push(`/uploads/${fileName}`);
            }
            // ----------- 5) 必要なら DB 登録や外部 API 呼び出し -----------
            // 例: await prisma.post.create({ data: { caption, location, images: savedPaths } })
            // ----------- 6) レスポンス -----------
            return server_1.NextResponse.json({
                message: 'アップロード完了',
                images: savedPaths,
                caption,
                location,
            }, { status: 201 });
        }
        catch (err) {
            console.error('Upload Error:', err);
            return server_1.NextResponse.json({ message: 'サーバエラーが発生しました' }, { status: 500 });
        }
    }
    exports_1("POST", POST);
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
            // この API はリクエストボディが大きくなるため、
            // Next.js のデフォルト 4 MB 制限を超える場合は下記を追加
            exports_1("config", config = {
                api: {
                    bodyParser: false,
                },
            });
        }
    };
});
