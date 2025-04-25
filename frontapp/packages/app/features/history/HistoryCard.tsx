// components/HistoryCard.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, XStack, Avatar, Button, Text, YStack, Image as TImage } from 'tamagui'
import { Calendar, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from '@tamagui/lucide-icons'

type PostItem = {
  id: number
  caption: string
  imageUrl: string
  date: string
  likes: number
  comments: number
  saved: boolean
}

export const HistoryCard: React.FC<{
  post: PostItem
  myAccount: { avatarUrl: string; name: string }
  onMorePress: (post: PostItem) => void
  onToggleSaved: (id: number) => void
}> = ({ post, myAccount, onMorePress, onToggleSaved }) => {
  const router = useRouter()

  // 日付フォーマット用ヘルパー (無効な日付は空文字に)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return ''
    }
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    }).format(date)
  }

  return (
    <Card elevate size="$4" borderRadius="$6" backgroundColor="white" overflow="hidden" pressStyle={{ scale: 0.98 }}>
      {/* カードヘッダー */}
      <XStack padding="$3" alignItems="center" justifyContent="space-between">
        <XStack space="$2" alignItems="center">
          <Avatar circular size="$3" backgroundColor="blue" onPress={() => router.push('/profile')}>
            <Avatar.Image source={{ uri: myAccount.avatarUrl }} />
            <Avatar.Fallback backgroundColor="$blue9" />
          </Avatar>
          <Text fontWeight="500">{myAccount.name}</Text>
        </XStack>
        <Button icon={<MoreHorizontal size="$2" />} circular chromeless size="$3" onPress={() => onMorePress(post)} />
      </XStack>

      {/* 投稿画像 */}
      <TImage source={{ uri: post.imageUrl }} width="100%" height={300} resizeMode="cover" />

      {/* アクションボタン */}
      <XStack padding="$3" justifyContent="space-between">
        <XStack space="$3">
          <Button icon={<Heart size="$1.5" color={post.likes > 100 ? '$red10' : '$gray10'} />} circular chromeless>
            <Text color="$gray11" marginLeft="$1">{post.likes}</Text>
          </Button>
          <Button icon={<MessageCircle size="$1.5" color="$gray10" />} circular chromeless>
            <Text color="$gray11" marginLeft="$1">{post.comments}</Text>
          </Button>
          <Button icon={<Share2 size="$1.5" color="$gray10" />} circular chromeless />
        </XStack>
        <Button
          icon={<Bookmark size="$1.5" color={post.saved ? '$blue10' : '$gray10'} fill={post.saved ? '$blue10' : 'transparent'} />}
          circular
          chromeless
          onPress={() => onToggleSaved(post.id)}
        />
      </XStack>

      {/* キャプションと日付 */}
      <YStack padding="$3" paddingTop="$0" space="$2">
        <Text numberOfLines={2} color="$gray12" lineHeight={22}>{post.caption}</Text>
        <XStack alignItems="center" space="$2">
          <Calendar size="$1" color="$gray9" />
          <Text fontSize="$2" color="$gray9">{formatDate(post.date)}</Text>
        </XStack>
      </YStack>
    </Card>
  )
}