// apps/next/app/page.tsx
'use client'

import React from 'react'
import { Theme, YStack } from 'tamagui'
import { HomeScreen } from 'app/features/home/screen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function HomePage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <Theme name="light">
        <HomeScreen />
      </Theme>
    </YStack>
  )
}
