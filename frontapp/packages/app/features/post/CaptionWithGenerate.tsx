import React from 'react'
import { YStack, TextArea, Button, XStack, Text, Spinner } from 'tamagui'
import { Rocket, MapPin, Tag } from '@tamagui/lucide-icons'

type Props = {
  caption: string
  onChange: (text: string) => void
  isLoading: boolean
  onGenerate: () => void
  location: string
  onAddLocation: () => void
  onTag: () => void
}

export function CaptionWithGenerate({ caption, onChange, isLoading, onGenerate, location, onAddLocation, onTag }: Props) {
  return (
    <YStack space="$3" width="100%">
      <YStack position="relative" width="100%">
        <TextArea
          placeholder="キャプションを入力..."
          value={caption}
          onChange={e => onChange(e.target.value)}
          minHeight={100}
          bg="$accent11"
          borderColor="$gray5"
          borderWidth={1}
          borderRadius="$4"
          padding="$3"
          paddingRight="$9"
          backgroundColor="$gray1"
        />
        <Button
          onPress={onGenerate}
          disabled={isLoading}
          circular={!isLoading}
          width={isLoading ? '$auto' : 32}
          px={isLoading ? '$3' : undefined}
          size={isLoading ? '$4' : '$3'}
          position="absolute"
          top="$3"
          right="$3"
        >
          {isLoading ? (
            <XStack space="$2" alignItems="center" jc="center">
              <Spinner animation="spin" color="$accent1" />
              <Text>生成中…</Text>
            </XStack>
          ) : (
            <Rocket />
          )}
        </Button>
      </YStack>
      <XStack space="$3" flexWrap="wrap">
        <Button size="$3" theme="gray" icon={MapPin} chromeless onPress={onAddLocation}>
          {location || '場所を追加'}
        </Button>
        <Button size="$3" theme="gray" icon={Tag} chromeless onPress={onTag}>
          タグ付け
        </Button>
      </XStack>
    </YStack>
  )
}