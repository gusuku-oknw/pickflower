// packages/app/features/menu/HamburgerMenu.tsx
'use client'

import React, { useState, useEffect } from 'react'
import {
  Button,
  YStack,
  XStack,
  Text,
  AnimatePresence,
  Stack,
  Theme,
  useTheme,
  Separator,
  H2,
  H3,
  Paragraph,
  Tooltip,
  Avatar
} from 'tamagui'
import {
  Menu,
  X,
  Home,
  User,
  Camera,
  Settings,
  History,
  Moon,
  Sun,
  ChevronRight,
  MailQuestion,
  ScrollText,
  UserX,
  FileEdit,
  Leaf,
  Calendar,
  MapPin,
  Mail,
  Info,
  Clock,
  Tractor
} from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { LinearGradient } from 'tamagui/linear-gradient'
import { useSupabaseAuth } from '../../auth-next/hooks/useSupabaseAuth'
import { fetchUserData } from '../../supabase/dbService'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const theme = useTheme()
  const router = useRouter()
  const { user, loading: authLoading } = useSupabaseAuth()

  // 初回だけデータベースからプロフィールデータを取得する（既に取得済みの場合は再取得しない）
  useEffect(() => {
    async function loadData() {
      if (user && !userData) {
        try {
          setIsDataLoading(true)
          const data = await fetchUserData(user.id)
          setUserData(data)
        } catch (err) {
          console.error('データロード中のエラー:', err)
        } finally {
          setIsDataLoading(false)
        }
      }
    }
    loadData()
  }, [user, userData])

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  const navigateTo = (route: string) => {
    setIsOpen(false)
    router.push(route)
  }

  const primaryMenuItems = [
    { icon: Home, label: 'ホーム', route: '/' },
    { icon: Camera, label: '投稿作成', route: '/post' },
    { icon: History, label: '投稿履歴', route: '/history' },
    { icon: User, label: 'プロフィール', route: '/profile' },
    { icon: Settings, label: '設定', route: '/settings' }
  ]

  // myAccount は認証情報からのフォールバック用。DBのデータがない場合に利用する
  const myAccount = {
    avatarUrl:
      userData?.profile_image || user?.profile_image || 'https://placehold.jp/300x200.png?text=User',
    // ユーザーネームは DB の username を優先、なければ認証情報の name（またはメール）を利用
    name: userData?.username || user?.name || user?.email || 'ログインしていません',
    email: user?.email || ''
  }

  return (
    <Theme name="light">
      {/* オーバーレイ背景（メニュー開いたとき） */}
      <AnimatePresence>
        {isOpen && (
          <Stack
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0,0,0,0.4)"
            zIndex={999}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            animation="quick"
            opacity={1}
            onPress={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* メニューボタン */}
      <Button
        onPress={toggleMenu}
        circular
        size="$4"
        pressStyle={{ scale: 0.5, opacity: 0.5 }}
        animation="quick"
        zIndex={1001}
        borderWidth={1}
      >
        {isOpen ? <X size="$3" /> : <Menu size="$3" color="$white12" />}
      </Button>

      {/* サイドメニュー */}
      <AnimatePresence>
        {isOpen && (
          <>
            <YStack
              position="fixed"
              top={0}
              left={0}
              bottom={0}
              width="85%"
              maxWidth={360}
              backgroundColor="$background"
              zIndex={1000}
              enterStyle={{ x: -320 }}
              exitStyle={{ x: -320 }}
              animation="quick"
              x={0}
              shadowOffset={{ width: 5, height: 0 }}
              shadowOpacity={0.2}
              shadowRadius={20}
            >
              {/* ヘッダー部分 */}
              <LinearGradient
                colors={['light', '#dddddd']}
                start={[0, 0]}
                end={[1, 1]}
                width="100%"
                padding="$10"
                paddingTop="$10"
                paddingBottom="$6"
              >
                <XStack alignItems="center" space="$3">
                  <Avatar circular size="$5" backgroundColor="blue">
                    <Avatar.Image source={{ uri: myAccount.avatarUrl }} />
                    <Avatar.Fallback backgroundColor="$blue9" />
                  </Avatar>
                  <YStack>
                    <H2 color="white" fontWeight="600" fontSize="$5">
                      {myAccount.name}
                    </H2>
                    <Paragraph color="$color1" opacity={0.9}>
                      {myAccount.email}
                    </Paragraph>
                  </YStack>
                </XStack>
              </LinearGradient>

              {/* メニュー項目 */}
              <YStack flex={1} padding="$2" space="$1">
                {primaryMenuItems.map((item, index) => (
                  <Button
                    key={index}
                    onPress={() => navigateTo(item.route)}
                    bg="transparent"
                    hoverStyle={{ bg: '$color3' }}
                    pressStyle={{ scale: 0.98, opacity: 0.9 }}
                    animation="quick"
                    justifyContent="flex-start"
                    paddingVertical="$3.5"
                    paddingHorizontal="$4"
                    borderRadius="$4"
                  >
                    <XStack alignItems="center" space="$3" width="100%">
                      <item.icon size="$4" color="$color11" />
                      <Text flex={1} fontSize="$4" fontWeight="500" color="$color12">
                        {item.label}
                      </Text>
                      <ChevronRight size="$3" opacity={0.7} />
                    </XStack>
                  </Button>
                ))}
              </YStack>

              {/* 新しいアイコンボタンエリア */}
              <XStack justifyContent="space-around" paddingTop="$3">
                {/* お問い合わせ */}
                <Tooltip placement="top">
                  <Tooltip.Trigger>
                    <Button
                      onPress={() => navigateTo('/contact')}
                      bg="transparent"
                      size="$5"
                      circular
                      icon={<MailQuestion size="$5" color="$color11" />}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Tooltip.Arrow />
                    <Paragraph size="$2">お問い合わせ</Paragraph>
                  </Tooltip.Content>
                </Tooltip>

                {/* 利用規約 */}
                <Tooltip placement="top">
                  <Tooltip.Trigger>
                    <Button
                      onPress={() => navigateTo('/terms')}
                      bg="transparent"
                      size="$5"
                      circular
                      icon={<ScrollText size="$5" color="$color11" />}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Tooltip.Arrow />
                    <Paragraph size="$2">利用規約</Paragraph>
                  </Tooltip.Content>
                </Tooltip>

                {/* ログアウト */}
                <Tooltip placement="top">
                  <Tooltip.Trigger>
                    <Button
                      onPress={() => {
                        console.log('ログアウト処理')
                        navigateTo('/logout')
                      }}
                      bg="transparent"
                      size="$5"
                      circular
                      icon={<UserX size="$5" color="$color11" />}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Tooltip.Arrow />
                    <Paragraph size="$2">ログアウト</Paragraph>
                  </Tooltip.Content>
                </Tooltip>
              </XStack>

              {/* フッター部分 */}
              <YStack padding="$3" space="$4">
                <Separator />
                <Button
                  onPress={toggleTheme}
                  bg="transparent"
                  hoverStyle={{ bg: '$color3' }}
                  pressStyle={{ scale: 0.98 }}
                  animation="quick"
                  justifyContent="flex-start"
                  paddingVertical="$3"
                  paddingHorizontal="$4"
                  borderRadius="$4"
                >
                  <XStack alignItems="center" space="$3" width="100%">
                    {isDarkMode ? (
                      <Sun size="$4" color="$color11" />
                    ) : (
                      <Moon size="$4" color="$color11" />
                    )}
                    <Text fontSize="$4" fontWeight="500" color="$color12">
                      {isDarkMode ? 'ライトモード' : 'ダークモード'}
                    </Text>
                  </XStack>
                </Button>
                <Paragraph textAlign="center" fontSize="$3" color="$color10" paddingBottom="$2">
                  v1.0.0
                </Paragraph>
              </YStack>
            </YStack>
          </>
        )}
      </AnimatePresence>
    </Theme>
  )
}

export default HamburgerMenu
