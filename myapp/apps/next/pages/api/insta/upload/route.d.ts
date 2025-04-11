import { NextResponse } from 'next/server';
/**
 * 画像アップロード用 API
 * 期待する multipart/form-data:
 *  ├─ media0, media1, ... : File
 *  ├─ caption             : string
 *  └─ location            : string (任意)
 */
export declare function POST(req: Request): Promise<NextResponse<{
    message: string;
}>>;
export declare const config: {
    api: {
        bodyParser: boolean;
    };
};
