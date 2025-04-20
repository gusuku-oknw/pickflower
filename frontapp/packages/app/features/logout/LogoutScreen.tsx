'use client'

import React, { useState } from 'react'
import {
  YStack,
  Paragraph,
  Button,
  Text,
  XStack,
  AnimatePresence,
  Card,
  Theme,
  useTheme,
  H4
} from 'tamagui'
import { useRouter } from 'next/navigation'
import { LogOut, LogIn, AlertCircle, ArrowLeft } from '@tamagui/lucide-icons'
import { useSupabaseAuth } from '../../../auth-next/hooks/useSupabaseAuth'

export function LogoutScreen() {
  const { user, loading, error, signOut } = useSupabaseAuth()
  const [confirming, setConfirming] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    signOut()
    console.log('ログアウト処理を実行中...')
    router.push('/')
  }

  const handleCancel = () => {
    setConfirming(false)
  }

// 未ログイン時はログインボタンを表示
  if (!user && !loading) {
    return (
      <Theme name="light">
        <YStack
          flex={1}
          padding="$6"
          justifyContent="center"
          alignItems="center"
          backgroundImage="linear-gradient(135deg, $blue10 0%, $purple10 100%)"
        >
          <Card
            elevation="$3"
            bordered
            borderRadius="$6"
            width="100%"
            maxWidth={400}
            padding="$6"
            backgroundColor="$background"
          >
            <YStack space="$5" alignItems="center">
              <LogIn size={28} color="$blue10" />
              <Text fontSize="$5" color="$color" textAlign="center">
                ログインが必要です
              </Text>
              <Button
                size="$4"
                theme="blue"
                icon={LogIn}
                onPress={() => router.push('/login')}
                borderRadius="$4"
                width="100%"
              >
                ログイン
              </Button>
            </YStack>
          </Card>
        </YStack>
      </Theme>
    )
  }

  return (
    <Theme name="light">
      <YStack
        flex={1}
        padding="$6"
        space="$5"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          elevation="$4"
          bordered
          borderRadius="$6"
          width="100%"
          maxWidth={450}
          padding="$6"
          backgroundColor="$accent5"
        >
          <YStack space="$5" alignItems="center">
            <XStack alignItems="center" space="$2">
              <LogOut size="$28" color="$color0" />
              <H4 textAlign="center" color="$color">
                ログアウト
              </H4>
            </XStack>

            <YStack space="$4" width="100%">
              <AnimatePresence>
                {confirming ? (
                  <YStack
                    animation="bouncy"
                    enterStyle={{ opacity: 0, scale: 0.9 }}
                    exitStyle={{ opacity: 0, scale: 0.9 }}
                    space="$4"
                  >
                    <XStack space="$2" alignItems="center">
                      <AlertCircle size={16} color="$color0" />
                      <Paragraph color="$color" fontWeight="500">
                        本当にログアウトしますか？
                      </Paragraph>
                    </XStack>

                    <XStack space="$3" justifyContent="flex-end">
                      <Button
                        size="$3"
                        variant="outlined"
                        onPress={handleCancel}
                        icon={ArrowLeft}
                      >
                        キャンセル
                      </Button>
                      <Button
                        size="$3"
                        onPress={handleLogout}
                        icon={LogOut}
                        borderRadius="$4"
                      >
                        ログアウトする
                      </Button>
                    </XStack>
                  </YStack>
                ) : (
                  <YStack
                    animation="bouncy"
                    enterStyle={{ opacity: 0, scale: 0.9 }}
                    exitStyle={{ opacity: 0, scale: 0.9 }}
                    space="$4"
                  >
                    <Paragraph textAlign="center" color="$color">
                      アカウントからログアウトしようとしています。
                      <br />
                      ログアウト後は再度ログインが必要になります。
                    </Paragraph>

                    <Button
                      size="$4"
                      theme="blue"
                      icon={LogOut}
                      onPress={() => setConfirming(true)}
                      borderRadius="$4"
                      pressStyle={{ scale: 0.97 }}
                      animation="bouncy"
                    >
                      ログアウトを確認する
                    </Button>
                  </YStack>
                )}
              </AnimatePresence>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </Theme>
  )
}
