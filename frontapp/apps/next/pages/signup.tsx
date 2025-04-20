'use client'

import { YStack } from 'tamagui'
import { SignupScreen } from 'app/features/signup/signupScreen'

export default function singupPage() {
  return (
    <YStack flex={1} padding="$4">
      <SignupScreen />
    </YStack>
  )
}
