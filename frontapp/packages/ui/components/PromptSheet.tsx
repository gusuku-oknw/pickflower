// components/PromptSheet.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { Sheet, Button, XStack, YStack, Paragraph, TextArea } from 'tamagui'
import { Plus, Save, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import AsyncStorage from '@callstack/async-storage'

const STORAGE_KEY = 'userPrompts'

export function PromptSheet() {
  const [open, setOpen] = useState(false)
  const [prompts, setPrompts] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const [editing, setEditing] = useState(false)
  const [position, setPosition] = useState(0)

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
    const next = [...prompts, current]
    setPrompts(next)
    setCurrent('')
    setEditing(false)
    try {
      const raw = JSON.stringify(next)
      if (Platform.OS === 'web') localStorage.setItem(STORAGE_KEY, raw)
      else await AsyncStorage.setItem(STORAGE_KEY, raw)
    } catch {}
  }

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
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
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" gap="$4">
          {editing ? (
            <YStack space="$3">
              <TextArea
                value={current}
                onChange={e => setCurrent(e.target.value)}
                placeholder="新しいプロンプトを入力"
                minHeight={80}
              />
              <Button icon={Save} onPress={save}>
                保存
              </Button>
            </YStack>
          ) : (
            <Button icon={Plus} onPress={() => setEditing(true)}>
              プロンプト追加
            </Button>
          )}

          {prompts.map((p, i) => (
            <XStack key={i} ai="center" jc="space-between">
              <Paragraph>{p}</Paragraph>
              <Button size="$2" onPress={() => {/* 生成ロジックに p を渡す */}}>
                選択
              </Button>
            </XStack>
          ))}
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
