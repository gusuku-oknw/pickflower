'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { ProfileScreen } from 'app/features/profile/ProfileScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function profilePage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <ProfileScreen />
    </YStack>
  )
}
