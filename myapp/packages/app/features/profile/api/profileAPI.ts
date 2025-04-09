// packages/app/features/profile/api/profileAPI.ts
export async function fetchUserProfile(userId: string) {
  // 実際には fetch や axios を用いてサーバーからユーザー情報を取得する例
  const response = await fetch(`/api/user/${userId}`)
  if (!response.ok) {
    throw new Error('ユーザー情報の取得に失敗しました')
  }
  return response.json()
}
