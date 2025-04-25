'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ScrollView,
  YStack,
  Text,
  Spinner,
  Theme,
  Button,
  Stack
} from 'tamagui'
import { Calendar } from '@tamagui/lucide-icons'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import { fetchPostsData } from '../../../supabase/dbService'
import { HistoryHeader } from './HistoryHeader'
import { HistoryCard } from './HistoryCard'
import { PostOptionsSheet } from './PostOptionsSheet'
import { LoadMoreSentinel } from './LoadMoreSentinel'

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
  const router = useRouter()
  const { user, loading: authLoading } = useSupabaseAuth()

  const myAccount = {
    avatarUrl: user?.avatar_url || 'https://placehold.jp/300x200.png?text=User',
    name: user?.email || 'マイアカウント'
  }

  const [history, setHistory] = useState<PostItem[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const limit = 5

// ページング取得
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const { data, error } = await fetchPostsData(offset, limit)
      if (error) {
        console.error(error)
        return
      }

      // データがあれば追加、オフセット更新
      if (data.length > 0) {
        setHistory(prev => [...prev, ...data])
        setOffset(prev => prev + data.length)
      }

      // 取得件数が limit 未満ならもう次はないと判断
      if (data.length < limit) {
        setHasMore(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [offset, loading, hasMore])

// 初回ロード（マウント時のみ一度だけ呼ぶ）
  useEffect(() => {
    fetchPosts()
  }, [])

  // 無限スクロール検知（重複呼び出しを防ぐため、コールバック内で一旦 unobserve → fetch → 再 observe の流れに）
  useEffect(() => {
    const target = loadMoreRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting && !loading && hasMore) {
          // 一旦オブザーバー解除
          observer.unobserve(target)
          fetchPosts().finally(() => {
            // データ取得後、まだ更に読み込む必要があれば再度オブザーブ
            if (hasMore && target) {
              observer.observe(target)
            }
          })
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(target)
    return () => {
      observer.disconnect()
    }
  }, [fetchPosts, loading, hasMore])

  // 投稿削除
  const handleDeletePost = () => {
    if (selectedPost) {
      setHistory(prev => prev.filter(item => item.id !== selectedPost.id))
      setShowOptions(false)
      setSelectedPost(null)
    }
  }

  // 保存切替
  const toggleSaved = (id: number) =>
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    )

  const handleMorePress = (post: PostItem) => {
    setSelectedPost(post)
    setShowOptions(true)
  }

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
              <Text color="$gray10" textAlign="center" fontSize="$5" fontWeight="500">
                投稿履歴はありません
              </Text>
              <Text color="$gray9" textAlign="center">
                新しい投稿を作成して思い出を残しましょう
              </Text>
              <Button marginTop="$5" theme="blue" fontSize="$3" borderRadius="$6">
                新規投稿を作成
              </Button>
            </YStack>
          ) : (
            <YStack space="$5">
              {history.map(post => (
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

          {/* スクロール終端検知用 sentinel */}
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
