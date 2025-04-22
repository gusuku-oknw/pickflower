// components/HistoryCard.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, XStack, Avatar, Button, Text, YStack, Image as TImage } from 'tamagui'
// import { TImage } from '@tamagui/lucide-icons'
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
  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }).format(new Date(dateString))

  return (
    <Card elevate size="$4" borderRadius="$6" backgroundColor="white" overflow="hidden" pressStyle={{ scale: 0.98 }}>
      <XStack padding="$3" alignItems="center" justifyContent="space-between">
        <XStack space="$2" alignItems="center">
          <Avatar circular size="$3" backgroundColor="blue" onPress={() => router.push('/profile')}>
            <Avatar.Image source={{ uri: myAccount.avatarUrl }} />
            <Avatar.Fallback backgroundColor="$accent9" />
          </Avatar>
          <Text fontWeight="500">{myAccount.name}</Text>
        </XStack>
        <Button icon={<MoreHorizontal size="$2" />} circular chromeless size="$3" onPress={() => onMorePress(post)} />
      </XStack>

      <TImage source={{ uri: post.imageUrl }} width="100%" height={300} resizeMode="cover" />

      <XStack padding="$3" justifyContent="space-between">
        <XStack space="$3" alignItems="center">
          <Button
            // アイコンサイズをトークンではなく数値(px)で指定してしっかり大きくする
            icon={<Heart size={20} color={post.likes > 100 ? '$accent5' : '$color'} />}
            // circular を外して横幅をテキストに合わせられるように
            circular={false}
            chromeless
            // padding を入れて余白を確保
            padding="$1"
          >
            {/* テキストも少し大きめに */}
            <Text fontSize="$2">{post.likes}</Text>
          </Button>

          <Button
            icon={<MessageCircle size={20} color="$gray10" />}
            circular={false}
            chromeless
            padding="$1"
          >
            <Text fontSize="$2">{post.comments}</Text>
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
