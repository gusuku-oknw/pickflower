'use client'

import React, { useEffect, useState } from 'react'
import { Theme, Spinner, YStack, Paragraph } from 'tamagui'
import { MarkdownRenderer } from '../../../ui/components/MarkdownRenderer'
import { fetchPolicyData } from '../../../supabase/dbService'

export function PolicyScreen() {
  const [md, setMd] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const data = await fetchPolicyData()
        // fetchPolicyData は { content_md: string } を返す想定
        setMd(data.content_md)
      } catch (err) {
        console.error('データロード中のエラー:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <Theme name="light">
      <YStack flex={1} padding="$4">
        <YStack flex={1} padding="$4" backgroundColor="$background">
          <Paragraph fontSize="$10" color="$text">
            プライバシーポリシー
          </Paragraph>
        </YStack>
      </YStack>
      {loading ? (
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$accent9" />
        </YStack>
      ) : md ? (
        <MarkdownRenderer content={md} />
      ) : (
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Paragraph color="$error9">ポリシーが見つかりません</Paragraph>
        </YStack>
      )}
    </Theme>
  )
}
