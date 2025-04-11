// packages/app/features/terms/TermsScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Button } from 'tamagui'

export function TermsScreen() {
  const handleAccept = () => {
    // ここに利用規約に同意する処理や画面遷移などを実装してください
    console.log('利用規約に同意しました')
  }

  return (
    <YStack flex={1} padding="$4" space>
      <Paragraph fontSize="$5" fontWeight="bold" textAlign="center">
        利用規約
      </Paragraph>
      <Paragraph>
        こちらの利用規約は、サービスをご利用いただくにあたっての重要なルールを定めています。お客様は、以下の内容にご同意の上でサービスをご利用ください。
      </Paragraph>
      <Paragraph>
        ※ 利用規約の詳細な内容は、実際の運用に合わせてこちらに記載してください。必要に応じてセクション分けやスクロール可能なコンテナなどを利用するとよいでしょう。
      </Paragraph>
      <Button onPress={handleAccept}>
        同意する
      </Button>
    </YStack>
  )
}
