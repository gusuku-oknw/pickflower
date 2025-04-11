'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { NotificationsScreen } from 'app/features/notifications/NotificationsScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function notificationsPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <NotificationsScreen />
    </YStack>
  )
}
