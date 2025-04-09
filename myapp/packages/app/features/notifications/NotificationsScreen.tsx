// packages/app/features/notifications/NotificationsScreen.tsx
'use client'

import React, { useState } from 'react'
import { YStack, Paragraph, Button } from 'tamagui'

export function NotificationsScreen() {
  // サンプルの通知メッセージ
  const [notifications, setNotifications] = useState<string[]>([
    '新しいメッセージが届きました。',
    'システムメンテナンスのお知らせです。',
    'アップデートが完了しました。',
  ])

  // 通知を全てクリアするハンドラー
  const clearNotifications = () => {
    setNotifications([])
    console.log('すべての通知をクリアしました。')
  }

  return (
    <YStack flex={1} padding="$4" space>
      <Paragraph fontSize="$4" fontWeight="bold" textAlign="center">
        通知
      </Paragraph>
      {notifications.length === 0 ? (
        <Paragraph textAlign="center">新しい通知はありません。</Paragraph>
      ) : (
        notifications.map((notification, index) => (
          <Paragraph key={index}>{notification}</Paragraph>
        ))
      )}
      <Button onPress={clearNotifications} disabled={notifications.length === 0}>
        通知を全て消去
      </Button>
    </YStack>
  )
}
