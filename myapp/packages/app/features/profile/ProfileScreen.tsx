// packages/app/features/profile/ProfileScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Button, Avatar, Spinner } from 'tamagui'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'

export function ProfileScreen() {
  const { user, loading, error, signIn, signOut } = useSupabaseAuth()

  if (loading) {
    return (
      <YStack flex={1} padding="$4" alignItems="center" justifyContent="center">
        <Spinner />
      </YStack>
    )
  }

  if (error || !user) {
    return (
      <YStack flex={1} padding="$4" alignItems="center" justifyContent="center">
        <Paragraph color="$color11">
          ユーザー情報の取得に失敗しました
        </Paragraph>
        <Button
          onPress={() => {
            // 仮のログイン処理：適宜サインインフォーム等に差し替えてください
            signIn('derblack461@gmail.com', 'j8DJdHfE')
          }}
        >
          ログイン
        </Button>
      </YStack>
    )
  }

  return (
    <YStack flex={1} padding="$4" space>
      <YStack alignItems="center" space>
        <Avatar
          size="$10"
          src={
            // Supabase Auth のユーザーオブジェクトでは、ユーザー情報は user_metadata に含まれる場合が多い
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

      <Paragraph>
        {user.user_metadata?.bio || 'プロフィール情報はありません'}
      </Paragraph>
      <Paragraph color="$color11">{user.email}</Paragraph>

      <Button onPress={signOut}>ログアウト</Button>
    </YStack>
  )
}
