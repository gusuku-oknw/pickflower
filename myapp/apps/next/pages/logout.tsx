'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { HomeScreen } from 'app/features/home/screen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function logoutPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <HomeScreen />
    </YStack>
  )
}
