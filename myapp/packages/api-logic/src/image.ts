// packages/api-logic/src/image.ts
import fs from 'fs/promises'
import path from 'path'

/**
 * 画像ファイルをアップロードし、保存先の URL を返す関数
 * @param file - アップロードする File オブジェクト
 */
export async function uploadImage(file: File): Promise<{ url: string }> {
  if (!(file instanceof File)) {
    throw new Error('Invalid file')
  }

  // アップロード先ディレクトリ（例：プロジェクトルート/public/uploads）
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadDir, { recursive: true })

  // 衝突防止のためタイムスタンプ付きのファイル名を生成
  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(uploadDir, fileName)

  // File オブジェクトを Buffer に変換して保存
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  await fs.writeFile(filePath, buffer)

  return { url: `/uploads/${fileName}` }
}

/**
 * 指定されたファイルパスの画像を削除する関数
 * @param filePathParam - URL（例：/uploads/xxx.jpg）
 */
export async function deleteImage(filePathParam: string): Promise<void> {
  // セキュリティ上、必ず /uploads/ から始まるかチェックする
  if (!filePathParam.startsWith('/uploads/')) {
    throw new Error('Invalid file path')
  }
  const fullPath = path.join(process.cwd(), 'public', filePathParam)
  await fs.unlink(fullPath)
}
