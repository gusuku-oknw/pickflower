'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { PostScreen } from 'app/features/post/postScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function logoutPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <PostScreen />
    </YStack>
  )
}
