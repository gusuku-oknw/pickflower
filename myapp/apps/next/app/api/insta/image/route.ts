import { NextResponse } from 'next/server'
import { uploadImage, deleteImage } from '../../../../../../packages/api-logic/src/image'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('media')
    if (!file || !(file instanceof File)) {
      console.error('ファイルが正しく送信されていません:', file)
      return NextResponse.json({ message: 'ファイルが見つかりませんでした' }, { status: 400 })
    }

    // デバッグ用のログ：ファイルの情報を確認
    console.log('受信したファイル:', { name: file.name, size: file.size, type: file.type })

    const result = await uploadImage(file)
    return NextResponse.json({ url: result.url, message: 'アップロード完了' }, { status: 201 })
  } catch (error) {
    // エラーの詳細情報をログに出力
    console.error('画像アップロードエラー:', error)
    return NextResponse.json({ message: 'アップロード中にエラーが発生しました' }, { status: 500 })
  }
}