'use client'

import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react'
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
  Spinner
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

import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'

/** 投稿データの型 */
type PostItem = {
  id: number
  caption: string
  imageUrl: string
  date: string
  likes: number
  comments: number
  saved: boolean
}

/** ヘッダー表示用コンポーネント */
const HistoryHeader: React.FC = () => (
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
    <Paragraph color="$gray10">あなたの思い出を振り返りましょう</Paragraph>
    <Separator marginTop="$2" />
  </YStack>
)

/** 各投稿カード表示用コンポーネント */
const HistoryCard: React.FC<{
  post: PostItem
  myAccount: { avatarUrl: string; name: string }
  onMorePress: (post: PostItem) => void
  onToggleSaved: (id: number) => void
}> = ({ post, myAccount, onMorePress, onToggleSaved }) => {
  const router = useRouter()

  // 日付フォーマット用ヘルパー
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
    <Card
      key={post.id}
      elevate
      size="$4"
      bordered={false}
      animation="bouncy"
      scale={1}
      pressStyle={{ scale: 0.98 }}
      borderRadius="$6"
      backgroundColor="white"
      overflow="hidden"
    >
      {/* カードヘッダー */}
      <XStack padding="$3" alignItems="center" justifyContent="space-between">
        <XStack space="$2" alignItems="center">
          {/* アバター（onPress で /profile へ遷移） */}
          <Avatar
            circular
            size="$3"
            backgroundColor="blue"
            onPress={() => router.push('/profile')}
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
          onPress={() => onMorePress(post)}
        />
      </XStack>

      {/* 投稿画像 */}
      <TImage
        source={{ uri: post.imageUrl }}
        width="100%"
        height={300}
        resizeMode="cover"
      />

      {/* アクションボタン */}
      <XStack padding="$3" justifyContent="space-between">
        <XStack space="$3">
          <Button
            icon={<Heart size="$1.5" color={post.likes > 100 ? '$red10' : '$gray10'} />}
            circular
            chromeless
          >
            <Text color="$gray11" marginLeft="$1">{post.likes}</Text>
          </Button>
          <Button icon={<MessageCircle size="$1.5" color="$gray10" />} circular chromeless>
            <Text color="$gray11" marginLeft="$1">{post.comments}</Text>
          </Button>
          <Button icon={<Share2 size="$1.5" color="$gray10" />} circular chromeless />
        </XStack>
        <Button
          icon={
            <Bookmark
              size="$1.5"
              color={post.saved ? '$blue10' : '$gray10'}
              fill={post.saved ? '$blue10' : 'transparent'}
            />
          }
          circular
          chromeless
          onPress={() => onToggleSaved(post.id)}
        />
      </XStack>

      {/* キャプションと日付 */}
      <YStack padding="$3" paddingTop="$0" space="$2">
        <Text numberOfLines={2} color="$gray12" lineHeight={22}>
          {post.caption}
        </Text>
        <XStack alignItems="center" space="$2">
          <Calendar size="$1" color="$gray9" />
          <Text fontSize="$2" color="$gray9">
            {formatDate(post.date)}
          </Text>
        </XStack>
      </YStack>
    </Card>
  )
}

/** 投稿オプションを表示するシートコンポーネント */
const PostOptionsSheet: React.FC<{
  open: boolean
  onClose: () => void
  onDelete: () => void
}> = ({ open, onClose, onDelete }) => (
  <Sheet
    modal
    open={open}
    onOpenChange={onClose}
    snapPoints={[40]}
    dismissOnSnapToBottom
  >
    <Sheet.Overlay
      animation="lazy"
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    />
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
          onPress={onDelete}
        >
          <Text color="$red10">投稿を削除</Text>
        </Button>
      </YStack>
      <Button size="$4" theme="gray" marginTop="$2" onPress={onClose}>
        キャンセル
      </Button>
    </Sheet.Frame>
  </Sheet>
)

/** Intersection Observer 用 sentinel コンポーネント */
const LoadMoreSentinel: React.FC<{ innerRef: React.Ref<HTMLDivElement> }> = ({ innerRef }) => {
  return <YStack ref={innerRef} height={20} />
}

/** メインの HistoryScreen コンポーネント */
export function HistoryScreen() {
  const router = useRouter()
  const { user, loading: authLoading } = useSupabaseAuth()

  // Supabase のユーザー情報から myAccount を生成
  const myAccount = {
    // ユーザー情報に avatar_url があればその値、なければ public 内のローカルアバター ("/avatar") を利用
    avatarUrl: user?.avatar_url || 'https://placehold.jp/300x200.png?text=User',
    // ユーザー名（なければ "マイアカウント"）
    name: user?.email || 'マイアカウント'
  }

  // 投稿一覧等のステート
  const [history, setHistory] = useState<PostItem[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // 投稿データを取得（ページング対応、offset と limit で取得）
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8000/api/history?offset=${offset}&limit=5`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data: PostItem[] = await res.json()
      if (data.length === 0) {
        setHasMore(false)
      } else {
        setHistory(prev => [...prev, ...data])
        setOffset(prev => prev + data.length)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [offset, loading, hasMore])

  // 初回ロード
  useEffect(() => {
    fetchPosts()
  }, []) // マウント時のみ

  // Intersection Observer を使って sentinel 要素が表示されたら次のデータ取得
  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts()
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    )

    const currentRef = loadMoreRef.current
    observer.observe(currentRef)

    return () => {
      observer.unobserve(currentRef)
    }
  }, [fetchPosts])

  // 投稿削除処理
  const handleDeletePost = () => {
    if (selectedPost) {
      setHistory(prev => prev.filter(item => item.id !== selectedPost.id))
      setShowOptions(false)
      setSelectedPost(null)
    }
  }

  // 保存切替
  const toggleSaved = (id: number) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    )
  }

  // Moreボタン押下時の処理
  const handleMorePress = (post: PostItem) => {
    setSelectedPost(post)
    setShowOptions(true)
  }

  // ユーザー情報取得中の場合は Spinner を表示
  if (authLoading) {
    return (
      <YStack flex={1} padding="$4" alignItems="center" justifyContent="center">
        <Spinner />
      </YStack>
    )
  }

  return (
    <Theme name="light">
      <ScrollView flex={1} backgroundColor="$gray1">
        <YStack padding="$4" space="$5">
          <HistoryHeader />

          {/* 投稿一覧がない場合の表示 */}
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
              <Button marginTop="$5" theme="blue" fontSize="$3" borderRadius="$6">
                新規投稿を作成
              </Button>
            </YStack>
          ) : (
            <YStack space="$5">
              {history.map((post) => (
                <HistoryCard
                  key={post.id}
                  post={post}
                  myAccount={myAccount}
                  onMorePress={handleMorePress}
                  onToggleSaved={toggleSaved}
                />
              ))}
            </YStack>
          )}

          <LoadMoreSentinel innerRef={loadMoreRef} />

          <YStack padding="$4" alignItems="center">
            {loading && <Text color="$gray9">読み込み中...</Text>}
            {!hasMore && <Text color="$gray9">これ以上ありません</Text>}
          </YStack>
        </YStack>
      </ScrollView>
      <PostOptionsSheet
        open={showOptions}
        onClose={() => setShowOptions(false)}
        onDelete={handleDeletePost}
      />
    </Theme>
  )
}
