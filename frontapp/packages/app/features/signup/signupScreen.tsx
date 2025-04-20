// packages/app/features/signup/SignupScreen.tsx
'use client'

import React, { useState } from 'react'
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  H2,
  Paragraph,
  Separator,
  Theme,
  Stack,
  Form,
  Spinner,
  Checkbox,
  Label
} from 'tamagui'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import { useRouter } from 'next/navigation'
import {
  ChevronRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Home,
  MapPin,
  Check
} from '@tamagui/lucide-icons'

export function SignupScreen() {
  const { signUp, loading, error } = useSupabaseAuth()
  const router = useRouter()

  // フォーム入力を管理するstate
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [farmName, setFarmName] = useState('')
  const [location, setLocation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  // アニメーション用のstate
  const [isSubmitting, setIsSubmitting] = useState(false)

  // バリデーション用state
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  })

  const validateForm = () => {
    let isValid = true
    const errors = {
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    }

    // メールアドレスの検証
    if (!email) {
      errors.email = 'メールアドレスを入力してください'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '有効なメールアドレスを入力してください'
      isValid = false
    }

    // パスワードの検証
    if (!password) {
      errors.password = 'パスワードを入力してください'
      isValid = false
    } else if (password.length < 8) {
      errors.password = 'パスワードは8文字以上必要です'
      isValid = false
    }

    // パスワード確認の検証
    if (password !== confirmPassword) {
      errors.confirmPassword = 'パスワードが一致しません'
      isValid = false
    }

    // 利用規約同意の検証
    if (!agreeTerms) {
      errors.terms = '利用規約に同意する必要があります'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSignup = async () => {
    if (!validateForm()) return

    try {
      setIsSubmitting(true)

      // ユーザーメタデータを準備
      const metadata = {
        full_name: fullName,
        farm_name: farmName,
        location: location
      }

      // サインアップ処理を実行
      const res = await signUp(email, password, metadata)

      // エラーがなければ確認ページへ
      if (!res.error) {
        router.push('/signup-confirmation')
      } else {
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('サインアップ中のエラー:', err)
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <Theme name="accent">
      <Form
        onSubmit={handleSignup}
        backgroundColor="$background"
        flex={1}
      >
        <YStack
          flex={1}
          padding="$5"
          space="$4"
          justifyContent="center"
          maxWidth={550}
          width="100%"
          marginHorizontal="auto"
        >
          <Stack
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
                新規アカウント登録
              </H2>
              <Paragraph textAlign="center" color="$color" opacity={0.8}>
                農家のためのインスタ自動投稿アプリ
              </Paragraph>
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
                <Text color="$error10">
                  {error.message}
                </Text>
              </Stack>
            )}

            {/* 入力フォーム */}
            <YStack space="$4">
              {/* 名前 */}
              <YStack space="$2">
                <Label htmlFor="fullName">お名前 (任意)</Label>
                <XStack
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$3"
                  padding="$2"
                  paddingLeft="$3"
                  backgroundColor="$background"
                  alignItems="center"
                >
                  <User size="$1" color="$accent9" />
                  <Input
                    id="fullName"
                    flex={1}
                    placeholder="山田 太郎"
                    value={fullName}
                    onChangeText={setFullName}
                    size="$4"
                    marginLeft="$2"
                    borderWidth={0}
                  />
                </XStack>
              </YStack>

              {/* 農場名 */}
              <YStack space="$2">
                <Label htmlFor="farmName">農場名 (任意)</Label>
                <XStack
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$3"
                  padding="$2"
                  paddingLeft="$3"
                  backgroundColor="$background"
                  alignItems="center"
                >
                  <Home size="$1" color="$accent9" />
                  <Input
                    id="farmName"
                    flex={1}
                    placeholder="山田ファーム"
                    value={farmName}
                    onChangeText={setFarmName}
                    size="$4"
                    marginLeft="$2"
                    borderWidth={0}
                  />
                </XStack>
              </YStack>

              {/* 地域 */}
              <YStack space="$2">
                <Label htmlFor="location">地域 (任意)</Label>
                <XStack
                  borderWidth={1}
                  borderColor="$borderColor"
                  borderRadius="$3"
                  padding="$2"
                  paddingLeft="$3"
                  backgroundColor="$background"
                  alignItems="center"
                >
                  <MapPin size="$1" color="$accent9" />
                  <Input
                    id="location"
                    flex={1}
                    placeholder="〇〇県△△市"
                    value={location}
                    onChangeText={setLocation}
                    size="$4"
                    marginLeft="$2"
                    borderWidth={0}
                  />
                </XStack>
              </YStack>

              {/* メールアドレス */}
              <YStack space="$2">
                <Label htmlFor="email">メールアドレス <Text color="$error9">*</Text></Label>
                <XStack
                  borderWidth={1}
                  borderColor={formErrors.email ? "$error9" : "$borderColor"}
                  borderRadius="$3"
                  padding="$2"
                  paddingLeft="$3"
                  backgroundColor="$background"
                  alignItems="center"
                >
                  <Mail size="$1" color={formErrors.email ? "$error9" : "$accent9"} />
                  <Input
                    id="email"
                    flex={1}
                    placeholder="example@farm.jp"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text)
                      if (formErrors.email) {
                        setFormErrors({...formErrors, email: ''})
                      }
                    }}
                    size="$4"
                    marginLeft="$2"
                    borderWidth={0}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    required
                  />
                </XStack>
                {formErrors.email && (
                  <Text color="$error9" fontSize="$2">{formErrors.email}</Text>
                )}
              </YStack>

              {/* パスワード */}
              <YStack space="$2">
                <Label htmlFor="password">パスワード <Text color="$error9">*</Text></Label>
                <XStack
                  borderWidth={1}
                  borderColor={formErrors.password ? "$error9" : "$borderColor"}
                  borderRadius="$3"
                  padding="$2"
                  paddingLeft="$3"
                  backgroundColor="$background"
                  alignItems="center"
                >
                  <Lock size="$1" color={formErrors.password ? "$error9" : "$accent9"} />
                  <Input
                    id="password"
                    flex={1}
                    placeholder="8文字以上"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(text) => {
                      setPassword(text)
                      if (formErrors.password) {
                        setFormErrors({...formErrors, password: ''})
                      }
                    }}
                    size="$4"
                    marginLeft="$2"
                    borderWidth={0}
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    size="$2"
                    circular
                    transparent
                    onPress={togglePasswordVisibility}
                    marginRight="$1"
                  >
                    {showPassword ? <EyeOff size="$1" color="$color" /> : <Eye size="$1" color="$color" />}
                  </Button>
                </XStack>
                {formErrors.password && (
                  <Text color="$error9" fontSize="$2">{formErrors.password}</Text>
                )}
              </YStack>

              {/* パスワード（確認用） */}
              <YStack space="$2">
                <Label htmlFor="confirmPassword">パスワード (確認) <Text color="$error9">*</Text></Label>
                <XStack
                  borderWidth={1}
                  borderColor={formErrors.confirmPassword ? "$error9" : "$borderColor"}
                  borderRadius="$3"
                  padding="$2"
                  paddingLeft="$3"
                  backgroundColor="$background"
                  alignItems="center"
                >
                  <Lock size="$1" color={formErrors.confirmPassword ? "$error9" : "$accent9"} />
                  <Input
                    id="confirmPassword"
                    flex={1}
                    placeholder="パスワードを再入力"
                    value={confirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text)
                      if (formErrors.confirmPassword) {
                        setFormErrors({...formErrors, confirmPassword: ''})
                      }
                    }}
                    size="$4"
                    marginLeft="$2"
                    borderWidth={0}
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    size="$2"
                    circular
                    transparent
                    onPress={toggleConfirmPasswordVisibility}
                    marginRight="$1"
                  >
                    {showConfirmPassword ? <EyeOff size="$1" color="$color" /> : <Eye size="$1" color="$color" />}
                  </Button>
                </XStack>
                {formErrors.confirmPassword && (
                  <Text color="$error9" fontSize="$2">{formErrors.confirmPassword}</Text>
                )}
              </YStack>

              {/* 利用規約同意 */}
              <XStack marginTop="$1" space="$2" alignItems="center">
                <Checkbox
                  id="terms"
                  size="$4"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => {
                    setAgreeTerms(checked)
                    if (formErrors.terms) {
                      setFormErrors({...formErrors, terms: ''})
                    }
                  }}
                >
                  <Checkbox.Indicator>
                    <Check size={16} color="$accent9" />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="terms" justifyContent="flex-start" size="$3" color="$color" opacity={0.9}>
                  <Text>
                    <Text>利用規約</Text>
                    <Text color="$accent9" onPress={() => router.push('/terms')}> および </Text>
                    <Text color="$accent9" onPress={() => router.push('/privacy')}>プライバシーポリシー</Text>
                    <Text> に同意します</Text>
                  </Text>
                </Label>
              </XStack>
              {formErrors.terms && (
                <Text color="$error9" fontSize="$2">{formErrors.terms}</Text>
              )}
            </YStack>

            {/* 登録ボタン */}
            <Button
              backgroundColor="$accent9"
              color="white"
              size="$4"
              marginTop="$2"
              onPress={handleSignup}
              disabled={loading || isSubmitting}
              pressStyle={{ opacity: 0.8 }}
              animation="quick"
              height={50}
              fontSize="$5"
              fontWeight="600"
              type="submit"
              icon={isSubmitting ? null : ChevronRight}
              // iconAfter は不要。アイコンを後ろに表示したい場合は JSX 要素を渡す
              // iconAfter={ChevronRight}  のようにコンポーネントを直接渡すか、
              // そもそも icon プロップだけで先頭／末尾制御できます
            >
              {loading || isSubmitting ? (
                <XStack space="$2">
                  <Spinner color="white" size="small" />
                  <Text color="white">登録中...</Text>
                </XStack>
              ) : '新規登録'}
            </Button>
          </Stack>

          {/* 補足情報 */}
          <YStack alignItems="center" space="$2" marginTop="$2">
            <XStack space="$2">
              <Text color="$color" opacity={0.7} fontSize="$3">
                すでにアカウントをお持ちの方は
              </Text>
              <Text
                color="$accent9"
                fontWeight="500"
                fontSize="$3"
                pressStyle={{ opacity: 0.7 }}
                onPress={() => router.push('/login')}
              >
                ログイン
              </Text>
            </XStack>
          </YStack>
        </YStack>
      </Form>
    </Theme>
  )
}