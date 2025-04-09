// packages/app/features/logout/LogoutScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Button } from 'tamagui'

export function LogoutScreen() {
  const handleLogout = () => {
    // ここにログアウト処理を追加してください
    // 例: next-auth を使っている場合は signOut() を呼び出す
    // signOut({ redirect: true, callbackUrl: '/' })
    console.log('ログアウト処理を実行中...')
  }

  return (
    <YStack flex={1} padding="$4" space>
      <Paragraph fontSize="$4" textAlign="center">
        ログアウト
      </Paragraph>
      <Paragraph>
        本当にログアウトしてよろしいですか？ログアウトすると、再度ログインが必要になります。
      </Paragraph>
      <Button onPress={handleLogout}>
        ログアウトする
      </Button>
    </YStack>
  )
}
