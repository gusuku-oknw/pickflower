'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { PolicyScreen } from 'app/features/privacy/privacyScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function privacyPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <PolicyScreen />
    </YStack>
  )
}
