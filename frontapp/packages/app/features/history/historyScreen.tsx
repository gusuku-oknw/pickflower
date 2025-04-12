'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  YStack,
  Paragraph,
  Button,
  Text,
  Image as TImage,
  XStack,
  H2,
  ScrollView,
  Card,
  Avatar,
  Separator,
  Sheet,
  Stack,
  Theme,
} from 'tamagui'

import {
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Trash2,
  Download,
  Pen
} from '@tamagui/lucide-icons'

type PostItem = {
  id: number
  caption: string
  imageUrl: string
  date: string
  likes: number
  comments: number
  saved: boolean
}

export function HistoryScreen() {
  // マイアカウント情報（例）
  const myAccount = {
    avatarUrl: '/avatar.jpg',
    name: 'マイアカウント',
  }

  const [history, setHistory] = useState<PostItem[]>([])
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null)
  const [showOptions, setShowOptions] = useState(false)

  const router = useRouter()

  // バックエンドから投稿情報を取得
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 実際にはご自身のエンドポイントに合わせてURLを変更してください
        const res = await fetch('http://localhost:8000/api/history')
        if (!res.ok) throw new Error('Failed to fetch')
        const data: PostItem[] = await res.json()
        setHistory(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosts()
  }, [])

  const handleDeletePost = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id))
    setShowOptions(false)
  }

  const toggleSaved = (id: number) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    }).format(date)
  }

  return (
    <Theme name="light">
      <ScrollView flex={1} backgroundColor="$gray1">
        <YStack padding="$4" space="$5">
          {/* ヘッダー */}
          <YStack space="$2" paddingBottom="$2">
            <XStack alignItems="center" justifyContent="space-between">
              <H2 fontWeight="600">投稿履歴</H2>
              <XStack space="$2">
                <Button
                  icon={Calendar}
                  circular
                  chromeless
                  size="$3"
                  backgroundColor="$gray3"
                  color="$gray11"
                />
              </XStack>
            </XStack>
            <Paragraph color="$gray10">
              あなたの思い出を振り返りましょう
            </Paragraph>
            <Separator marginTop="$2" />
          </YStack>

          {/* 投稿リスト */}
          {history.length === 0 ? (
            <YStack
              height={300}
              justifyContent="center"
              alignItems="center"
              backgroundColor="$gray2"
              borderRadius="$6"
              padding="$6"
            >
              <Stack
                width={100}
                height={100}
                justifyContent="center"
                alignItems="center"
                backgroundColor="$gray3"
                borderRadius="$10"
                marginBottom="$4"
              >
                <Calendar size="$6" color="$gray10" />
              </Stack>
              <Paragraph
                textAlign="center"
                color="$gray10"
                marginBottom="$2"
                fontSize="$5"
                fontWeight="500"
              >
                投稿履歴はありません
              </Paragraph>
              <Text color="$gray9" textAlign="center">
                新しい投稿を作成して思い出を残しましょう
              </Text>
              <Button
                marginTop="$5"
                theme="blue"
                fontSize="$3"
                borderRadius="$6"
              >
                新規投稿を作成
              </Button>
            </YStack>
          ) : (
            <YStack space="$5">
              {history.map((item) => (
                <Card
                  key={item.id}
                  elevate
                  size="$4"
                  bordered={false}
                  animation="bouncy"
                  scale={1}
                  pressStyle={{
                    scale: 0.98,
                  }}
                  borderRadius="$6"
                  backgroundColor="white"
                  overflow="hidden"
                >
                  {/* カードヘッダー */}
                  <XStack padding="$3" alignItems="center" justifyContent="space-between">
                    <XStack space="$2" alignItems="center">
                      {/* アバターを押すと/Profile へ遷移 */}
                      <Avatar
                        circular
                        size="$3"
                        backgroundColor="blue"
                        onPress={() => router.push('/Profile')}
                      >
                        <Avatar.Image source={{ uri: myAccount.avatarUrl }} />
                        <Avatar.Fallback backgroundColor="$blue9" />
                      </Avatar>
                      <Text fontWeight="500">{myAccount.name}</Text>
                    </XStack>
                    <Button
                      icon={MoreHorizontal}
                      circular
                      chromeless
                      size="$2"
                      onPress={() => {
                        setSelectedPost(item)
                        setShowOptions(true)
                      }}
                    />
                  </XStack>

                  {/* 画像 */}
                  <TImage
                    source={{ uri: item.imageUrl }}
                    width="100%"
                    height={300}
                    resizeMode="cover"
                  />

                  {/* アクションボタン */}
                  <XStack padding="$3" justifyContent="space-between">
                    <XStack space="$3">
                      <Button
                        icon={<Heart size="$1.5" color={item.likes > 100 ? '$red10' : '$gray10'} />}
                        circular
                        chromeless
                      >
                        <Text color="$gray11" marginLeft="$1">{item.likes}</Text>
                      </Button>
                      <Button
                        icon={<MessageCircle size="$1.5" color="$gray10" />}
                        circular
                        chromeless
                      >
                        <Text color="$gray11" marginLeft="$1">{item.comments}</Text>
                      </Button>
                      <Button icon={<Share2 size="$1.5" color="$gray10" />} circular chromeless />
                    </XStack>
                    <Button
                      icon={<Bookmark
                        size="$1.5"
                        color={item.saved ? '$blue10' : '$gray10'}
                        fill={item.saved ? '$blue10' : 'transparent'}
                      />}
                      circular
                      chromeless
                      onPress={() => toggleSaved(item.id)}
                    />
                  </XStack>

                  {/* キャプションと日付 */}
                  <YStack padding="$3" paddingTop="$0" space="$2">
                    <Text numberOfLines={2} color="$gray12" lineHeight={22}>
                      {item.caption}
                    </Text>
                    <XStack alignItems="center" space="$2">
                      <Calendar size="$1" color="$gray9" />
                      <Text fontSize="$2" color="$gray9">
                        {formatDate(item.date)}
                      </Text>
                    </XStack>
                  </YStack>
                </Card>
              ))}
            </YStack>
          )}
        </YStack>
      </ScrollView>

      {/* 投稿オプションシート */}
      <Sheet
        modal
        open={showOptions}
        onOpenChange={setShowOptions}
        snapPoints={[40]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Frame padding="$4" space="$4">
          <H2 textAlign="center" fontWeight="600" marginBottom="$2">
            投稿オプション
          </H2>
          <Separator />
          <YStack space="$3" marginTop="$2">
            <Button
              icon={<Pen size="$1.5" color="" />}
              size="$4.5"
              fontWeight="700"
              justifyContent="flex-start"
              chromeless
              pressStyle={{ scale: 0.98, opacity: 0.8 }}
            >
              投稿を編集
            </Button>
            <Button
              icon={<Download size="$1.5" color="$blue10" />}
              size="$4"
              fontWeight="500"
              justifyContent="flex-start"
              chromeless
              pressStyle={{ scale: 0.98, opacity: 0.8 }}
            >
              <Text color="$blue10">画像を保存</Text>
            </Button>
            <Button
              icon={<Trash2 size="$1.5" color="$red10" />}
              size="$4"
              fontWeight="500"
              justifyContent="flex-start"
              chromeless
              pressStyle={{ scale: 0.98, opacity: 0.8 }}
              onPress={() => selectedPost && handleDeletePost(selectedPost.id)}
            >
              <Text color="$red10">投稿を削除</Text>
            </Button>
          </YStack>
          <Button
            size="$4"
            theme="gray"
            marginTop="$2"
            onPress={() => setShowOptions(false)}
          >
            キャンセル
          </Button>
        </Sheet.Frame>
      </Sheet>
    </Theme>
  )
}
