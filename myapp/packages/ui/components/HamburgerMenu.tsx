import React, { useState } from 'react'
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
  View,
  H2,
  Image,
  Paragraph,
  Tooltip
} from 'tamagui'
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  Bell,
  Bookmark,
  Moon,
  Sun,
  ChevronRight,
  MailQuestion,
  ScrollText,
  UserX
} from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { LinearGradient } from 'tamagui/linear-gradient'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const theme = useTheme()
  const router = useRouter()

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
    { icon: User, label: 'プロフィール', route: '/profile' },
    { icon: Bell, label: '通知', route: '/notifications' },
    { icon: Settings, label: '設定', route: '/settings' },
  ]

  return (
    <>
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
        bg={isOpen ? 'transparent' : '$background'}
        pressStyle={{ scale: 0.9, opacity: 0.8 }}
        animation="quick"
        zIndex={1001}
        borderWidth={1}
        borderColor="$borderColor"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={10}
      >
        {isOpen ? (
          <X size="$3" color="$color12" />
        ) : (
          <Menu size="$3" color="$color12" />
        )}
      </Button>

      {/* サイドメニュー */}
      <AnimatePresence>
        {isOpen && (
          <Theme name={isDarkMode ? "dark" : "light"}>
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
              shadowColor="$shadowColor"
              shadowOffset={{ width: 5, height: 0 }}
              shadowOpacity={0.2}
              shadowRadius={20}
            >
              {/* ヘッダー部分 */}
              <LinearGradient
                colors={['$blue8', '#dddddd']}
                start={[0, 0]}
                end={[1, 1]}
                width="100%"
                padding="$10"
                paddingTop="$10"
                paddingBottom="$6"
              >
                <XStack alignItems="center" space="$3">
                  <Stack
                    width={50}
                    height={50}
                    borderRadius={25}
                    backgroundColor="$color1"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <User size="$4" color="$color12" />
                  </Stack>
                  <YStack>
                    <H2 color="white" fontWeight="600" fontSize="$5">ゲスト</H2>
                    <Paragraph color="$color1" opacity={0.9}>guest@example.com</Paragraph>
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
                      <ChevronRight size="$3" color="$color9" opacity={0.7} />
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
          </Theme>
        )}
      </AnimatePresence>
    </>
  )
}

export default HamburgerMenu