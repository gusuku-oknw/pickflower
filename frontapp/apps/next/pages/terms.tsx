'use client'

import React from 'react'
import { YStack } from 'tamagui'
import { TermsScreen } from 'app/features/terms/TermsScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function termsPage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <TermsScreen />
    </YStack>
  )
}
