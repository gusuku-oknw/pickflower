import { NextResponse } from 'next/server';
/**
 * POST /api/insta/post
 * クライアントから送信された JSON 形式の投稿情報（画像 URL 配列、キャプション、場所）を受け取ります。
 * 通常はここでデータベースへの登録などを行いますが、ここでは簡易的に受信結果を返します。
 */
export declare function POST(req: Request): Promise<NextResponse<{
    message: string;
}>>;
