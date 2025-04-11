import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

/**
 * 画像アップロード用 API
 * 期待する multipart/form-data:
 *  ├─ media0, media1, ... : File
 *  ├─ caption             : string
 *  └─ location            : string (任意)
 */
export async function POST(req: Request) {
  try {
    // ----------- 1) フォームデータを取得 -----------
    const formData = await req.formData()

    // ----------- 2) 画像ファイルを抽出 -----------
    const files: File[] = []
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && key.startsWith('media')) {
        files.push(value)
      }
    }
    if (files.length === 0) {
      return NextResponse.json(
        { message: '画像が送信されていません' },
        { status: 400 },
      )
    }

    // ----------- 3) キャプション等を取得 -----------
    const caption = formData.get('caption')?.toString() ?? ''
    const location = formData.get('location')?.toString() ?? ''

    // ----------- 4) 画像を保存 -----------
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadDir, { recursive: true })

    // 画像ごとに保存し、保存先パスを収集
    const savedPaths: string[] = []

    for (const file of files) {
      // ファイル名が衝突しないようタイムスタンプを付与
      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, fileName)

      // File → Buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await fs.writeFile(filePath, buffer)
      savedPaths.push(`/uploads/${fileName}`)
    }

    // ----------- 5) 必要なら DB 登録や外部 API 呼び出し -----------
    // 例: await prisma.post.create({ data: { caption, location, images: savedPaths } })

    // ----------- 6) レスポンス -----------
    return NextResponse.json(
      {
        message: 'アップロード完了',
        images: savedPaths,
        caption,
        location,
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('Upload Error:', err)
    return NextResponse.json(
      { message: 'サーバエラーが発生しました' },
      { status: 500 },
    )
  }
}

// この API はリクエストボディが大きくなるため、
// Next.js のデフォルト 4 MB 制限を超える場合は下記を追加
export const config = {
  api: {
    bodyParser: false,
  },
}
