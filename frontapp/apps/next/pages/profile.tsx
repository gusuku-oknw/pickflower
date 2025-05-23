'use client'

import { YStack } from 'tamagui'
import { ProfileScreen } from 'app/features/profile/ProfileScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて

export default function ProfilePage() {
  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <ProfileScreen />
    </YStack>
  )
}
