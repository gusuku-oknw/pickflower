'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ScrollView, YStack, Text, Spinner, Theme, Button, Stack } from 'tamagui'
import { Calendar } from '@tamagui/lucide-icons'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import { HistoryHeader } from './HistoryHeader'
import { HistoryCard } from './HistoryCard'
import { PostOptionsSheet } from './PostOptionsSheet'
import { LoadMoreSentinel } from './LoadMoreSentinel'

const apiurl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type PostItem = { id: number; caption: string; imageUrl: string; date: string; likes: number; comments: number; saved: boolean }

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
      const res = await fetch(`${apiurl}/api/history?offset=${offset}&limit=5`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data: PostItem[] = await res.json()
      if (data.length === 0) setHasMore(false)
      else {
        setHistory(prev => [...prev, ...data])
        setOffset(prev => prev + data.length)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [offset, loading, hasMore])

  useEffect(() => { fetchPosts() }, [])

  // Intersection Observer を使って sentinel 要素が表示されたら次のデータ取得
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(entries => entries[0].isIntersecting && fetchPosts(), { threshold: 1.0 })
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [fetchPosts])

  // 投稿削除処理
  const handleDeletePost = () => {
    if (selectedPost) {
      setHistory(prev => prev.filter(item => item.id !== selectedPost.id))
      setShowOptions(false)
      setSelectedPost(null)
    }
  }

  const toggleSaved = (id: number) => setHistory(prev => prev.map(item => item.id === id ? { ...item, saved: !item.saved } : item))

  const handleMorePress = (post: PostItem) => { setSelectedPost(post); setShowOptions(true) }

  // ユーザー情報取得中の場合は Spinner を表示
  if (authLoading) {
    return <YStack flex={1} padding="$4" alignItems="center" justifyContent="center"><Spinner/></YStack>
  }

  return (
    <Theme name="light">
      <ScrollView flex={1} backgroundColor="$gray1">
        <YStack padding="$4" space="$5">
          <HistoryHeader />
          {history.length === 0 ? (
            <YStack height={300} justifyContent="center" alignItems="center" backgroundColor="$gray2" borderRadius="$6" padding="$6">
              <Stack width={100} height={100} justifyContent="center" alignItems="center" backgroundColor="$gray3" borderRadius="$10" marginBottom="$4">
                <Calendar size="$6" color="$gray10" />
              </Stack>
              <Text color="$gray10" textAlign="center" fontSize="$5" fontWeight="500">投稿履歴はありません</Text>
              <Text color="$gray9" textAlign="center">新しい投稿を作成して思い出を残しましょう</Text>
              <Button marginTop="$5" theme="blue" fontSize="$3" borderRadius="$6">新規投稿を作成</Button>
            </YStack>
          ) : (
            <YStack space="$5">{history.map(post => <HistoryCard key={post.id} post={post} myAccount={myAccount} onMorePress={handleMorePress} onToggleSaved={toggleSaved}/> )}</YStack>
          )}
          <LoadMoreSentinel innerRef={loadMoreRef} />
          <YStack padding="$4" alignItems="center">
            {loading && <Text color="$gray9">読み込み中...</Text>}
            {!hasMore && <Text color="$gray9">これ以上ありません</Text>}
          </YStack>
        </YStack>
      </ScrollView>
      <PostOptionsSheet open={showOptions} onClose={() => setShowOptions(false)} onDelete={handleDeletePost} />
    </Theme>
  )
}
