import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('media')
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: 'ファイルが見つかりませんでした' }, { status: 400 })
    }
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadDir, { recursive: true })
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadDir, fileName)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(filePath, buffer)
    return NextResponse.json({ url: `/uploads/${fileName}`, message: 'アップロード完了' }, { status: 201 })
  } catch (error) {
    console.error('画像アップロードエラー:', error)
    return NextResponse.json({ message: 'アップロード中にエラーが発生しました' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const filePathParam = searchParams.get('path')
    if (!filePathParam || !filePathParam.startsWith('/uploads/')) {
      return NextResponse.json({ message: '不正なパスです' }, { status: 400 })
    }
    const fullPath = path.join(process.cwd(), 'public', filePathParam)
    await fs.unlink(fullPath)
    return NextResponse.json({ message: '削除完了' }, { status: 200 })
  } catch (error) {
    console.error('画像削除エラー:', error)
    return NextResponse.json({ message: '削除中にエラーが発生しました' }, { status: 500 })
  }
}
