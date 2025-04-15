// packages/app/features/profile/ProfileScreen.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { YStack, Paragraph, Button, Avatar, Spinner } from 'tamagui'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import { fetchUserData } from '../../../supabase/dbService'
import { useRouter } from 'solito/navigation'

export function ProfileScreen() {
  // useSupabaseAuth から認証状態やユーザー情報を取得
  const { user, loading, error, signOut } = useSupabaseAuth()
  const router = useRouter()

  // 単一のオブジェクトを期待するので初期値は null にする
  const [userData, setUserData] = useState<any>(null)

  // ユーザー認証状態が確定し、認証エラーまたは未認証の場合に /login へ遷移
  useEffect(() => {
    if (!loading && (!user || error)) {
      router.push('/login')
    }
  }, [user, loading, error, router])

  // ユーザーが認証されている場合に、プロフィールデータをロード
  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          const data = await fetchUserData(user.id)
          setUserData(data)
        } catch (err) {
          console.error('データロード中のエラー:', err)
        }
      }
    }
    loadData()
  }, [user])

  // ローディング状態または未認証（リダイレクト待ち）の場合は Spinner を表示
  if (loading || !user) {
    return (
      <YStack flex={1} padding="$4" alignItems="center" justifyContent="center">
        <Spinner />
      </YStack>
    )
  }

  return (
    <YStack flex={1} padding="$4" space>
      <YStack alignItems="center" space>
        <Avatar
          size="$10"
          src={
            // Supabase Auth のユーザーオブジェクトでは、ユーザー情報は user_metadata に含まれることが多い
            user.user_metadata?.avatar_url ||
            'https://dummyimage.com/100x100/000/fff.png&text=Avatar'
          }
          borderWidth={2}
          borderColor="$color10"
          circular
        />
        <Paragraph fontSize="$6" fontWeight="bold">
          {user.user_metadata?.full_name || user.email}
        </Paragraph>
      </YStack>

      {/* 取得したユーザーデータの bio 表示 */}
      <Paragraph>
        {userData?.bio || 'プロフィール情報はありません'}
      </Paragraph>
      <Paragraph color="$color11">{user.email}</Paragraph>

      <Button onPress={signOut}>ログアウト</Button>

      {/* オプション: 取得した追加情報の一覧表示（デバッグ用など） */}
      {userData && (
        <YStack marginTop="$4" space>
          <Paragraph fontWeight="bold">追加情報</Paragraph>
          <Paragraph>{JSON.stringify(userData, null, 2)}</Paragraph>
        </YStack>
      )}
    </YStack>
  )
}
