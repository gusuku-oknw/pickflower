// packages/app/features/profile/ProfileScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Button, Avatar, Spinner } from 'tamagui'
import { useDummyAuth } from '../../../../packages/auth-next/hooks/useDummyAuth'

export function ProfileScreen() {
  const { user, isLoading, error, login, logout } = useDummyAuth()

  if (isLoading) {
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
        <Button onPress={login}>ログイン</Button>
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

      <Button onPress={logout}>
        ログアウト
      </Button>
    </YStack>
  )
}
