// components/PostOptionsSheet.tsx
'use client'

import React from 'react'
import { Sheet, H2, YStack, Separator, Button, Text } from 'tamagui'
import { Pen, Download, Trash2 } from '@tamagui/lucide-icons'

export const PostOptionsSheet: React.FC<{ open: boolean; onClose: () => void; onDelete: () => void }> = ({ open, onClose, onDelete }) => (
  <Sheet modal open={open} onOpenChange={onClose} snapPoints={[40]} dismissOnSnapToBottom>
    <Sheet.Overlay enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
    <Sheet.Frame padding="$4" space="$4">
      <H2 textAlign="center" fontWeight="600" marginBottom="$2">投稿オプション</H2>
      <Separator />
      <YStack space="$3" marginTop="$2">
        <Button icon={<Pen size="$1.5" />} size="$4.5" justifyContent="flex-start" chromeless>
          投稿を編集
        </Button>
        <Button icon={<Download size="$1.5" />} size="$4" justifyContent="flex-start" chromeless>
          <Text color="$blue10">画像を保存</Text>
        </Button>
        <Button icon={<Trash2 size="$1.5" color="$red10" />} size="$4" justifyContent="flex-start" chromeless onPress={onDelete}>
          <Text color="$red10">投稿を削除</Text>
        </Button>
      </YStack>
      <Button size="$4" theme="gray" marginTop="$2" onPress={onClose}>キャンセル</Button>
    </Sheet.Frame>
  </Sheet>
)