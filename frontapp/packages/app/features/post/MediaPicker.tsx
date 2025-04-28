import React, { useRef } from 'react'
import { YStack, Circle, Paragraph, Button, ScrollView, XStack, Stack, Text } from 'tamagui'
import { Camera, Image as ImageIcon, Plus, Trash2 } from '@tamagui/lucide-icons'
import type { UploadedImage } from './types'

type Props = {
  activeTab: 'camera' | 'gallery'
  mediaFiles: UploadedImage[]
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (idx: number) => void
}

export function MediaPicker({ activeTab, mediaFiles, onFileChange, onRemove }: Props) {
  const galleryRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  return (
    <YStack
      borderWidth={1}
      borderColor="$color5"
      borderRadius="$6"
      backgroundColor="$gray1"
      padding="$5"
      minHeight={200}
      justifyContent="center"
      alignItems="center"
      space="$4"
    >
      {mediaFiles.length === 0 ? (
        <>
          <Circle size={80} backgroundColor="$gray3" alignItems="center" justifyContent="center">
            {activeTab === 'camera'
              ? <Camera size="$5" color="$gray11" />
              : <ImageIcon size="$5" color="$gray11" />}
          </Circle>
          <YStack alignItems="center" space="$2">
            <Paragraph color="$gray11">
              {activeTab === 'camera' ? 'カメラで撮影してください' : 'ギャラリーから画像を選択'}
            </Paragraph>
            <Button
              size="$3"
              borderRadius="$6"
              bg="$accent5"
              hoverStyle={{ bg: '$accent1' }}
              onPress={() =>
                activeTab === 'camera'
                  ? cameraRef.current?.click()
                  : galleryRef.current?.click()
              }
            >
              {activeTab === 'camera' ? '写真を撮影' : '写真を選択'}
            </Button>
          </YStack>
        </>
      ) : (
        <YStack width="100%" space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <Text color="$gray11" fontSize="$3" fontWeight="500">
              選択済み: {mediaFiles.length} 枚
            </Text>
            <Button
              size="$2"
              bg="$accent5"
              hoverStyle={{ bg: '$accent1' }}
              iconAfter={<Plus size="$1" />}
              onPress={() =>
                activeTab === 'camera'
                  ? cameraRef.current?.click()
                  : galleryRef.current?.click()
              }
            >
              追加
            </Button>
          </XStack>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack space="$3" padding="$2.5">
              {mediaFiles.map(({ file }, idx) => (
                <Stack key={idx} position="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    width={120}
                    height={120}
                    style={{
                      borderRadius: '8px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <Button
                    position="absolute"
                    top={-8}
                    right={-8}
                    size="$2"
                    circular
                    icon={Trash2}
                    theme="red"
                    onPress={() => onRemove(idx)}
                  />
                </Stack>
              ))}
            </XStack>
          </ScrollView>
        </YStack>
      )}
      {/* hidden inputs */}
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </YStack>
  )
}
