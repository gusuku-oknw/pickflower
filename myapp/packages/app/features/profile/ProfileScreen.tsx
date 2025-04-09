// packages/app/features/profile/ProfileScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Button, Avatar, Spinner } from 'tamagui'
import { useUser } from './hooks/useUser'

export function ProfileScreen() {
  // 例として userId を固定値にしていますが、認証情報やグローバルコンテキストから取得する場合もあります
  const { user, loading, error } = useUser('12345')

  const handleEditProfile = () => {
    // プロフィール編集画面への遷移処理
    console.log('プロフィール編集画面へ遷移します')
  }

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
        <Paragraph color="$color11">ユーザー情報の取得に失敗しました</Paragraph>
      </YStack>
    )
  }

  return (
    <YStack flex={1} padding="$4" space>
      <YStack alignItems="center" space>
        <Avatar
          size="$10"
          src={user.avatarUrl}
          borderWidth={2}
          borderColor="$color10"
          circular
        />
        <Paragraph fontSize="$6" fontWeight="bold">
          {user.name}
        </Paragraph>
      </YStack>

      <Paragraph>{user.bio}</Paragraph>
      <Paragraph color="$color11">{user.email}</Paragraph>

      <Button onPress={handleEditProfile}>
        プロフィール編集
      </Button>
    </YStack>
  )
}
