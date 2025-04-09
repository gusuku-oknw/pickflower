'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { ContactScreen } from 'app/features/contact/ContactScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function contactPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <ContactScreen />
    </YStack>
  )
}
