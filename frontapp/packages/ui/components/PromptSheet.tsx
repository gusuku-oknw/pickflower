// components/PromptSheet.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import {
  Sheet,
  Button,
  XStack,
  YStack,
  Paragraph,
  TextArea,
  Text,
  Theme,
  Card,
  Separator,
  H4,
  AnimatePresence,
  useTheme
} from 'tamagui'
import {
  Plus,
  Save,
  ChevronDown,
  ChevronUp,
  Trash2,
  Star,
  Sparkles,
  X,
  AlertTriangle
} from '@tamagui/lucide-icons'
import AsyncStorage from '@callstack/async-storage'

const STORAGE_KEY = 'userPrompts'

export function PromptSheet() {
  const [open, setOpen] = useState(false)
  const [prompts, setPrompts] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const [editing, setEditing] = useState(false)
  const [position, setPosition] = useState(0)
  const [error, setError] = useState('')
  const theme = useTheme()

  // 保存データの読み込み
  useEffect(() => {
    const load = async () => {
      try {
        const raw = Platform.OS === 'web'
          ? localStorage.getItem(STORAGE_KEY)
          : await AsyncStorage.getItem(STORAGE_KEY)
        if (raw) setPrompts(JSON.parse(raw))
      } catch {}
    }
    load()
  }, [])

  // 保存処理
  const save = async () => {
    if (!current.trim()) {
      setError('プロンプトを入力してください')
      return
    }

    if (prompts.length >= 2) {
      setError('プロンプトは2つまでしか保存できません')
      return
    }

    const next = [...prompts, current]
    setPrompts(next)
    setCurrent('')
    setEditing(false)
    setError('')

    try {
      const raw = JSON.stringify(next)
      if (Platform.OS === 'web') localStorage.setItem(STORAGE_KEY, raw)
      else await AsyncStorage.setItem(STORAGE_KEY, raw)
    } catch {}
  }

  // 削除処理
  const deletePrompt = async (index: number) => {
    const next = [...prompts]
    next.splice(index, 1)
    setPrompts(next)

    try {
      const raw = JSON.stringify(next)
      if (Platform.OS === 'web') localStorage.setItem(STORAGE_KEY, raw)
      else await AsyncStorage.setItem(STORAGE_KEY, raw)
    } catch {}
  }

  // プロンプト選択処理
  const selectPrompt = async (index: number) => {
    // 選択したプロンプトを配列の先頭に移動
    const selected = prompts[index]
    const next = [selected, ...prompts.filter((_, i) => i !== index)]
    setPrompts(next)

    try {
      const raw = JSON.stringify(next)
      if (Platform.OS === 'web') localStorage.setItem(STORAGE_KEY, raw)
      else await AsyncStorage.setItem(STORAGE_KEY, raw)
    } catch {}

    // ここでプロンプトを使用する (配列の[0]を使用)
    console.log('Using prompt:', next[0])

    // シートを閉じる
    setOpen(false)
  }

  return (
    <Theme name="light">
      <Button
        size="$4"
        icon={open ? ChevronDown : ChevronUp}
        circular
        theme="blue"
        backgroundColor="$blue8"
        pressStyle={{ scale: 0.95 }}
        animation="bouncy"
        elevation="$4"
        onPress={() => setOpen(o => !o)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80, 300]}
        snapPointsMode="percent"
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle opacity={0.5} />
        <Sheet.Frame
          padding="$4"
          backgroundColor="$background"
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
        >
          <YStack space="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <H4>マイプロンプト</H4>
              <Button
                size="$3"
                chromeless
                circular
                onPress={() => setOpen(false)}
                icon={X}
              />
            </XStack>

            <Separator />

            <AnimatePresence>
              {editing ? (
                <YStack
                  space="$3"
                  animation="quick"
                  gap="$2"
                  enterStyle={{ opacity: 0, scale: 0.95 }}
                  exitStyle={{ opacity: 0, scale: 0.95 }}
                >
                  <TextArea
                    value={current}
                    onChangeText={setCurrent}
                    color="$color"
                    placeholder="新しいプロンプトを入力"
                    minHeight={80}
                    borderWidth={2}
                    borderColor={error ? '$red8' : '$blue8'}
                    autoFocus
                  />

                  {error ? (
                    <XStack space="$2" alignItems="center">
                      <AlertTriangle size={16} color="$red9" />
                      <Text color="$red9" fontSize="$2">{error}</Text>
                    </XStack>
                  ) : null}

                  <XStack space="$3" justifyContent="flex-end">
                    <Button
                      color="$color"
                      onPress={() => {
                        setEditing(false)
                        setCurrent('')
                        setError('')
                      }}
                    >
                      キャンセル
                    </Button>
                    <Button
                      color="$color"
                      icon={Save}
                      onPress={save}
                    >
                      保存
                    </Button>
                  </XStack>
                </YStack>
              ) : (
                <Button
                  icon={Plus}
                  color="$color"
                  disabled={prompts.length >= 2}
                  opacity={prompts.length >= 2 ? 0.5 : 1}
                  animation="quick"
                  enterStyle={{ opacity: 0, scale: 0.95 }}
                  exitStyle={{ opacity: 0, scale: 0.95 }}
                  onPress={() => setEditing(true)}
                >
                  プロンプト追加 {prompts.length}/2
                </Button>
              )}
            </AnimatePresence>

            <YStack space="$3">
              {prompts.length === 0 ? (
                <Card
                  bordered
                  animation="quick"
                  enterStyle={{ opacity: 0, scale: 0.95 }}
                  padding="$4"
                  backgroundColor="$backgroundHover"
                >
                  <YStack alignItems="center" space="$2">
                    <Sparkles size={18} color="$accent5" />
                    <Text color="$accent5" textAlign="center">
                      プロンプトを追加して始めましょう
                    </Text>
                  </YStack>
                </Card>
              ) : (
                prompts.map((prompt, index) => (
                  <Card
                    key={index}
                    bordered
                    borderColor={index === 0 ? '$blue8' : '$gray8'}
                    borderWidth={index === 0 ? 2 : 1}
                    padding="$3"
                    animation="quick"
                    enterStyle={{ opacity: 0, y: 10 }}
                    exitStyle={{ opacity: 0, y: -10 }}
                    pressStyle={{ scale: 0.98 }}
                  >
                    <YStack space="$2">
                      <XStack justifyContent="space-between" alignItems="center">
                        <XStack space="$1" alignItems="center">
                          {index === 0 && (
                            <Star size={14} color="$blue9" fill="$color" />
                          )}
                          <Text fontSize="$3" fontWeight={index === 0 ? "700" : "400"}>
                            {index === 0 ? '現在使用中' : 'プロンプト'}
                          </Text>
                        </XStack>
                        <XStack space="$2">
                          <Button
                            size="$2"
                            color="$red3"
                            icon={Trash2}
                            circular
                            chromeless
                            onPress={() => deletePrompt(index)}
                          />
                          {index !== 0 && (
                            <Button
                              size="$2"
                              color="$color"
                              icon={Star}
                              circular
                              chromeless
                              onPress={() => selectPrompt(index)}
                            />
                          )}
                        </XStack>
                      </XStack>

                      <Separator />

                      <Text
                        numberOfLines={2}
                        opacity={0.9}
                        fontSize="$2"
                      >
                        {prompt}
                      </Text>
                    </YStack>
                  </Card>
                ))
              )}
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </Theme>
  )
}