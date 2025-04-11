// packages/api-logic/src/post.ts

// 投稿情報の型定義
export interface PostData {
  images: string[]  // アップロード済み画像の URL 配列
  caption: string
  location: string
}

/**
 * 投稿作成処理（DB 登録などをシミュレーション）
 * @param data - 投稿データ（画像 URL、キャプション、場所）
 * @returns 作成された投稿データ（ここではそのまま返す）
 */
export async function createPost(data: PostData): Promise<PostData & { message: string }> {
  // 本来はデータベースへの登録処理を行う。
  // ここではシンプルに受け取ったデータに成功メッセージを追加して返す。
  return {
    ...data,
    message: '投稿が完了しました',
  }
}
