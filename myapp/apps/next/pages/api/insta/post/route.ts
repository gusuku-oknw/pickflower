import { NextResponse } from 'next/server'

/**
 * POST /api/insta/post
 * クライアントから送信された JSON 形式の投稿情報（画像 URL 配列、キャプション、場所）を受け取ります。
 * 通常はここでデータベースへの登録などを行いますが、ここでは簡易的に受信結果を返します。
 */
export async function POST(req: Request) {
  try {
    const { images, caption, location } = await req.json()

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ message: '画像は必須です' }, { status: 400 })
    }

    // TODO: ここで DB への登録や更なる処理を実装可能です
    const result = {
      images,
      caption,
      location,
      message: '投稿が完了しました',
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('投稿処理エラー:', error)
    return NextResponse.json(
      { message: '投稿中にエラーが発生しました' },
      { status: 500 },
    )
  }
}
