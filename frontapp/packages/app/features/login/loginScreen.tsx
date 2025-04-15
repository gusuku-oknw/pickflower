// packages/app/features/login/LoginScreen.tsx
'use client'

import React, { useState } from 'react'
import {
  YStack,
  XStack,
  Paragraph,
  Input,
  Button,
  H2,
  Text,
  Separator,
  Theme,
  Sheet,
  Stack
} from 'tamagui'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import { useRouter } from 'next/navigation'
import { ChevronRight, Mail, Lock, Eye, EyeOff } from '@tamagui/lucide-icons'

export function LoginScreen() {
  const { signIn, loading, error } = useSupabaseAuth()
  const router = useRouter()

  // ユーザー入力を管理する state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // アニメーション用のstate
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    try {
      setIsSubmitting(true)
      // サインイン処理を実行
      const res = await signIn(email, password)
      // signIn が成功してエラーがなければ、前のページに戻る
      if (!res.error) {
        router.back()
      } else {
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('ログイン中のエラー:', err)
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Theme name="light">
      <YStack
        flex={1}
        padding="$5"
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
        space="$4"
      >
        <Stack
          width="100%"
          maxWidth={450}
          padding="$5"
          backgroundColor="$background"
          borderRadius="$4"
          elevation="$4"
          shadowColor="$shadowColor"
          shadowRadius={20}
          space="$4"
        >
          {/* ヘッダー部分 */}
          <YStack space="$2" marginBottom="$2">
            <H2 textAlign="center" color="$color" fontWeight="bold">
              農家のための
            </H2>
            <H2 textAlign="center" color="$accent9" fontWeight="bold">
              インスタ自動投稿
            </H2>
            <Separator marginVertical="$4" />
          </YStack>

          {/* エラーメッセージ */}
          {error && (
            <Stack
              backgroundColor="$error2"
              padding="$3"
              borderRadius="$3"
              borderLeftWidth={4}
              borderColor="$error9"
            >
              <Text color="$error10">{error.message}</Text>
            </Stack>
          )}

          {/* 入力フォーム */}
          <YStack space="$4">
            <YStack space="$2">
              <Text color="$color" fontWeight="500">
                メールアドレス
              </Text>
              <XStack
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$3"
                padding="$2"
                paddingLeft="$3"
                backgroundColor="$background"
                alignItems="center"
              >
                <Mail size="$1" color="$accent9" />
                <Input
                  flex={1}
                  placeholder="example@farm.jp"
                  value={email}
                  onChangeText={setEmail}
                  size="$4"
                  marginLeft="$2"
                  borderWidth={0}
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </XStack>
            </YStack>

            <YStack space="$2">
              <Text color="$color" fontWeight="500">
                パスワード
              </Text>
              <XStack
                borderWidth={1}
                borderColor="$borderColor"
                borderRadius="$3"
                padding="$2"
                paddingLeft="$3"
                backgroundColor="$background"
                alignItems="center"
              >
                <Lock size="$1" color="$accent9" />
                <Input
                  flex={1}
                  placeholder="パスワードを入力"
                  value={password}
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                  size="$4"
                  marginLeft="$2"
                  borderWidth={0}
                  autoComplete="password"
                />
                <Button
                  size="$2"
                  circular
                  transparent
                  onPress={togglePasswordVisibility}
                  marginRight="$1"
                >
                  {showPassword ? (
                    <EyeOff size="$1" color="$color" />
                  ) : (
                    <Eye size="$1" color="$color" />
                  )}
                </Button>
              </XStack>
            </YStack>
          </YStack>

          {/* ログインボタン */}
          <Button
            backgroundColor="$accent9"
            color="white"
            size="$4"
            marginTop="$2"
            onPress={handleLogin}
            disabled={loading || isSubmitting}
            pressStyle={{ opacity: 0.8 }}
            animation="quick"
            height={50}
            fontSize="$5"
            fontWeight="600"
            icon={ChevronRight}
          >
            {loading || isSubmitting ? 'ログイン中...' : 'ログイン'}
          </Button>

          {/* 補足情報 */}
          <YStack marginTop="$2" alignItems="center" space="$2">
            <XStack space="$2">
              <Text color="$color" opacity={0.7} fontSize="$3">
                アカウントをお持ちでない方は
              </Text>
              <Text
                color="$accent9"
                fontWeight="500"
                fontSize="$3"
                pressStyle={{ opacity: 0.7 }}
                onPress={() => router.push('/signup')}
              >
                新規登録
              </Text>
            </XStack>
            <Text
              color="$accent9"
              fontSize="$3"
              pressStyle={{ opacity: 0.7 }}
              onPress={() => router.push('/forgot-password')}
            >
              パスワードをお忘れですか？
            </Text>
          </YStack>
        </Stack>
      </YStack>
    </Theme>
  )
}
