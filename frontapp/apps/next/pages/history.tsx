'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { HistoryScreen } from 'app/features/history/historyScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function logoutPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
    <HistoryScreen />
    </YStack>
  )
}
