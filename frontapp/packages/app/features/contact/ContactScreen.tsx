// packages/app/features/contact/ContactScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Button } from 'tamagui'

export function ContactScreen() {
  return (
    <YStack flex={1} padding="$4" space>
      <Paragraph fontSize="$4" textAlign="center">
        お問い合わせ
      </Paragraph>
      <Paragraph>
        ご質問やご要望がございましたら、下記のボタンをクリックしてお問い合わせフォームへお進みください。
      </Paragraph>
      <Button onPress={() => console.log('お問い合わせフォームへ遷移します')}>
        フォームを開く
      </Button>
    </YStack>
  )
}
