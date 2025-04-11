'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { SettingsScreen } from 'app/features/settings/SettingsScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function settingsPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <SettingsScreen />
    </YStack>
  )
}
