// components/ApiKeyChecker.tsx
'use client'

import React, { useEffect } from 'react'
import { YStack, Text } from 'tamagui'

// Next.js 側では .env.local にこんな感じで書いておく：
// NEXT_PUBLIC_API_KEY=abcdefg123456

export const ApiKeyChecker: React.FC = () => {
  // クライアントで参照可能なのは NEXT_PUBLIC_ プレフィックス付きだけ
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    console.log('🔑 NEXT_PUBLIC_API_KEY =', apiKey)
  }, [apiKey])

  return (
    <YStack padding="$4" space="$2">
      <Text fontSize="$4" fontWeight="600">
        API キー読み込みチェック
      </Text>
      {apiKey ? (
        <Text color="green">✅ キーが読み込まれています: {apiKey}</Text>
      ) : (
        <Text color="red">❌ キーが読み込まれていません</Text>
      )}
    </YStack>
  )
}
