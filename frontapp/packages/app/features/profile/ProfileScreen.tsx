// packages/app/features/profile/ProfileScreen.tsx
'use client'

import React, { useEffect, useState } from 'react'
import {
  YStack,
  XStack,
  Paragraph,
  Text,
  H2,
  H3,
  Button,
  Avatar,
  Spinner,
  Card,
  Theme,
  Separator,
  ScrollView,
  Stack
} from 'tamagui'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import { fetchUserData } from '../../../supabase/dbService'
import { useRouter } from 'solito/navigation'
import {
  LogOut,
  FileEdit,
  Instagram,
  Calendar,
  MapPin,
  Mail,
  Info,
  ChevronRight,
  Leaf,
  Clock,
  Tractor
} from '@tamagui/lucide-icons'

export function ProfileScreen() {
  // useSupabaseAuth から認証状態やユーザー情報を取得
  const { user, loading, error, signOut } = useSupabaseAuth()
  const router = useRouter()

  // 単一のオブジェクトを期待するので初期値は null にする
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ユーザー認証状態が確定し、認証エラーまたは未認証の場合に /login へ遷移
  useEffect(() => {
    if (!loading && (!user || error)) {
      router.push('/login')
    }
  }, [user, loading, error, router])

  // ユーザーが認証されている場合に、プロフィールデータをロード
  useEffect(() => {
    async function loadData() {
      if (user) {
        try {
          setIsLoading(true)
          const data = await fetchUserData(user.id)
          setUserData(data)
        } catch (err) {
          console.error('データロード中のエラー:', err)
        } finally {
          setIsLoading(false)
        }
      }
    }
    loadData()
  }, [user])

  // ローディング状態または未認証（リダイレクト待ち）の場合は Spinner を表示
  if (loading || !user) {
    return (
      <YStack flex={1} padding="$5" alignItems="center" justifyContent="center" backgroundColor="$background">
        <Spinner size="large" color="$accent9" />
      </YStack>
    )
  }

  const handleEditProfile = () => {
    router.push('/edit-profile')
  }

  // サンプルデータ (実際のデータがない場合に表示)
  const farmName = userData?.farm_name || "マイファーム"
  const location = userData?.location || "未設定"
  const joinDate = userData?.created_at
    ? new Date(userData.created_at).toLocaleDateString('ja-JP', {year: 'numeric', month: 'long', day: 'numeric'})
    : new Date().toLocaleDateString('ja-JP', {year: 'numeric', month: 'long', day: 'numeric'})

  // 最近の投稿 (サンプル)
  const recentPosts = userData?.recent_posts || [
    { id: 1, title: "今日の収穫", date: "2025/4/10", image: "/api/placeholder/100/100" },
    { id: 2, title: "新しい種まき", date: "2025/4/5", image: "/api/placeholder/100/100" },
  ]

  return (
    <Theme name="light">
      <ScrollView flex={1} backgroundColor="$background">
        <YStack padding="$4" space="$5">
          {/* ヘッダー部分 */}
          <Stack
            backgroundColor="$accent2"
            borderRadius="$4"
            padding="$5"
            shadowColor="$shadowColor"
            shadowRadius={10}
            shadowOpacity={0.1}
            elevation="$3"
          >
            <XStack space="$4" alignItems="center">
              <Avatar
                size="$11"
                circular
                borderWidth={3}
                borderColor="$accent9"
                backgroundColor="$background"
                overflow="hidden"
              >
                <Avatar.Image
                  src={userData?.profile_image || 'https://placehold.jp/300x300.png?text=User'}
                  resizeMode="cover"
                />
                <Avatar.Fallback backgroundColor="$accent4">
                  <Text color="$accent11" fontSize="$8">
                    {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </Text>
                </Avatar.Fallback>
              </Avatar>

              <YStack flex={1} space="$1">
                <H2 color="$color" fontWeight="bold">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'ユーザー'}
                </H2>
                <XStack alignItems="center" space="$2">
                  <Leaf size="$1" color="$accent9" />
                  <Text color="$color" opacity={0.8}>
                    {farmName}
                  </Text>
                </XStack>
                <XStack alignItems="center" space="$2">
                  <MapPin size="$1" color="$accent9" />
                  <Text color="$color" opacity={0.8}>
                    {location}
                  </Text>
                </XStack>
              </YStack>

              <Button
                size="$3"
                onPress={handleEditProfile}
                backgroundColor="$accent4"
                borderColor="$accent6"
                borderWidth={1}
                color="$accent11"
                icon={FileEdit}
                circular
              />
            </XStack>

            <Separator marginVertical="$4" />

            {/* バイオ */}
            <YStack space="$2">
              <Text color="$color" fontSize="$4" fontWeight="500">自己紹介</Text>
              <Text color="$color" opacity={0.9}>
                {userData?.bio || '自己紹介文が設定されていません。「編集」ボタンから追加できます。'}
              </Text>
            </YStack>

            {/* 基本情報 */}
            <XStack marginTop="$4" justifyContent="space-between">
              <YStack alignItems="center" space="$1">
                <Text color="$accent9" fontWeight="bold">
                  {userData?.post_count || 0}
                </Text>
                <Text fontSize="$2" color="$color" opacity={0.7}>
                  投稿
                </Text>
              </YStack>

              <YStack alignItems="center" space="$1">
                <Text color="$accent9" fontWeight="bold">
                  {userData?.follower_count || 0}
                </Text>
                <Text fontSize="$2" color="$color" opacity={0.7}>
                  フォロワー
                </Text>
              </YStack>

              <YStack alignItems="center" space="$1">
                <XStack alignItems="center" space="$1">
                  <Instagram size="$1" color="$accent9" />
                  <Text color="$accent9" fontWeight="bold">
                    {userData?.connected ? "連携中" : "未連携"}
                  </Text>
                </XStack>
                <Text fontSize="$2" color="$color" opacity={0.7}>
                  Instagramアカウント
                </Text>
              </YStack>
            </XStack>
          </Stack>

          {/* 詳細情報 */}
          <Card backgroundColor="$background" borderRadius="$4" padding="$4" elevation="$2">
            <YStack space="$3">
              <H3 color="$accent9">アカウント情報</H3>

              <XStack alignItems="center" space="$3">
                <Mail size="$1" color="$accent9" />
                <YStack>
                  <Text fontSize="$2" color="$color" opacity={0.7}>メールアドレス</Text>
                  <Text color="$color">{user.email}</Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" space="$3">
                <Calendar size="$1" color="$accent9" />
                <YStack>
                  <Text fontSize="$2" color="$color" opacity={0.7}>登録日</Text>
                  <Text color="$color">{joinDate}</Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" space="$3">
                <Clock size="$1" color="$accent9" />
                <YStack>
                  <Text fontSize="$2" color="$color" opacity={0.7}>最終ログイン</Text>
                  <Text color="$color">
                    {new Date().toLocaleDateString('ja-JP', {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          {/* 最近の投稿 */}
          <Card backgroundColor="$background" borderRadius="$4" padding="$4" elevation="$2">
            <YStack space="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <H3 color="$accent9">最近の投稿</H3>
                <Button
                  size="$2"
                  backgroundColor="transparent"
                  color="$accent9"
                  onPress={() => router.push('/posts')}
                  iconAfter={ChevronRight}
                >
                  すべて見る
                </Button>
              </XStack>

              {isLoading ? (
                <YStack alignItems="center" padding="$4">
                  <Spinner size="small" color="$accent9" />
                </YStack>
              ) : recentPosts.length > 0 ? (
                <YStack space="$3">
                  {recentPosts.map((post) => (
                    <XStack key={post.id} space="$3" padding="$2" borderRadius="$2" backgroundColor="$background" borderColor="$borderColor" borderWidth={1}>
                      <Card overflow="hidden" borderRadius="$2">
                        <Card.Background>
                          <img src={post.image} alt={post.title} width={80} height={80} style={{ objectFit: 'cover' }} />
                        </Card.Background>
                      </Card>
                      <YStack flex={1} justifyContent="space-between">
                        <Text fontWeight="500" color="$color">{post.title}</Text>
                        <Text fontSize="$2" color="$color" opacity={0.6}>{post.date}</Text>
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              ) : (
                <YStack alignItems="center" padding="$4">
                  <Text color="$color" opacity={0.7}>まだ投稿がありません</Text>
                </YStack>
              )}
            </YStack>
          </Card>

          {/* 農業データ */}
          <Card backgroundColor="$background" borderRadius="$4" padding="$4" elevation="$2">
            <YStack space="$3">
              <XStack alignItems="center" space="$2">
                <Tractor size="$1" color="$accent9" />
                <H3 color="$accent9">栽培データ</H3>
              </XStack>

              {userData?.crops ? (
                <YStack>
                  {userData.crops.map((crop, index) => (
                    <XStack key={index} padding="$2" justifyContent="space-between">
                      <Text color="$color">{crop.name}</Text>
                      <Text color="$accent9">{crop.status}</Text>
                    </XStack>
                  ))}
                </YStack>
              ) : (
                <YStack alignItems="center" padding="$3">
                  <Text color="$color" opacity={0.7}>栽培データがありません</Text>
                  <Button size="$2" marginTop="$2" backgroundColor="$accent4" color="$accent11">
                    データを追加
                  </Button>
                </YStack>
              )}
            </YStack>
          </Card>

          {/* ログアウトボタン */}
          <Button
            onPress={signOut}
            backgroundColor="$background"
            color="$color"
            borderColor="$borderColor"
            borderWidth={1}
            icon={LogOut}
            marginTop="$2"
            size="$4"
            height={45}
          >
            ログアウト
          </Button>

          {/* 開発用：JSON表示 */}
          {userData && process.env.NODE_ENV === 'development' && (
            <Card backgroundColor="$background" borderRadius="$4" padding="$4" marginTop="$4">
              <YStack space="$2">
                <XStack alignItems="center" space="$2">
                  <Info size="$1" color="$color" />
                  <Text fontWeight="bold" color="$color">開発者情報</Text>
                </XStack>
                <Separator />
                <Text fontFamily="$mono" fontSize="$2" color="$color" opacity={0.7} selectable>
                  {JSON.stringify(userData, null, 2)}
                </Text>
              </YStack>
            </Card>
          )}
        </YStack>
      </ScrollView>
    </Theme>
  )
}