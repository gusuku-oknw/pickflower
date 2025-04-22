// components/HistoryHeader.tsx
'use client'

import React from 'react'
import { YStack, XStack, H2, Paragraph, Separator, Button } from 'tamagui'
import { Calendar } from '@tamagui/lucide-icons'

export const HistoryHeader: React.FC = () => (
  <YStack space="$2" paddingBottom="$2">
    <XStack alignItems="center" justifyContent="space-between">
      <H2 fontWeight="600">投稿履歴</H2>
      <Button
        icon={<Calendar size="$2" />}
        circular
        chromeless
        size="$3"
        backgroundColor="$gray3"
        color="$gray11"
      />
    </XStack>
    <Paragraph color="$gray10">あなたの思い出を振り返りましょう</Paragraph>
    <Separator marginTop="$2" />
  </YStack>
)
