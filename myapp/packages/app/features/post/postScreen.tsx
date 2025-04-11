// packages/app/features/post/postScreen.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  TextArea,
  YStack,
  Text,
  Image as TImage,
  XStack,
  Stack,
  Circle,
  H2,
  Paragraph,
  Separator,
  Sheet,
  ScrollView,
} from 'tamagui'
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  Plus,
  Trash2,
  MapPin,
  Tag,
  Smile,
} from '@tamagui/lucide-icons'
import {
  ToastProvider,
  ToastViewport,
  useToastController,
} from '@tamagui/toast'

/* ====================== 型定義 ====================== */
type UploadedImage = {
  file: File   // プレビュー用
  url:  string // サーバ保存先 (/uploads/xxx.jpg)
}

/* =================================================== */
export function PostScreen() {
  /* ─────────── state & refs ─────────── */
  const [caption, setCaption]     = useState('')
  const [location, setLocation]   = useState('')
  const [activeTab, setActiveTab] = useState<'camera' | 'gallery'>('camera')

  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading]           = useState(false)

  const [mediaFiles, setMediaFiles] = useState<UploadedImage[]>([])

  const galleryInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef  = useRef<HTMLInputElement>(null)
  const toast           = useToastController()

  /* ─────────── upload animation ─────────── */
  useEffect(() => {
    if (uploading && uploadProgress < 100) {
      const t = setTimeout(() => setUploadProgress(p => Math.min(p + 10, 100)), 300)
      return () => clearTimeout(t)
    }
    if (uploading && uploadProgress === 100) {
      setUploading(false)
      setUploadProgress(0)
      toast.show('投稿が完了しました', { message: 'フォロワーに表示されます', duration: 3000 })
      setMediaFiles([])
      setCaption('')
      setLocation('')
    }
  }, [uploading, uploadProgress, toast])

  /* =============== 画像追加 =============== */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'))
    if (files.length === 0) return

    try {
      const uploaded: UploadedImage[] = await Promise.all(
        files.map(async (file) => {
          const fd = new FormData()
          fd.append('file', file)                // FastAPI 側は "file" を期待

          const res = await fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: fd,
          })
          if (!res.ok) throw new Error('upload failed')

          const { url } = await res.json() as { url: string }
          return { file, url }                   // ここで {file, url} を返す
        })
      )

      setMediaFiles(prev => [...prev, ...uploaded])

      toast.show('画像が追加されました', {
        message: `${uploaded.length} 枚の画像をアップロードしました`,
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast.show('アップロードに失敗しました', { duration: 3000, native: true })
    }
  }

  /* =============== 画像削除 =============== */
  const removeImage = async (idx: number) => {
    const target = mediaFiles[idx]
    if (!target) return
    try {
      // FastAPI に削除エンドポイントを用意している場合はそちらへ
      const res = await fetch(`http://localhost:8000/delete?path=${encodeURIComponent(target.url)}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('delete failed')
      setMediaFiles(prev => prev.filter((_, i) => i !== idx))
    } catch (err) {
      console.error(err)
      toast.show('削除に失敗しました', { duration: 3000, native: true })
    }
  }

  /* =============== 投稿 =============== */
  const handlePost = async () => {
    if (mediaFiles.length === 0) {
      toast.show('画像が必要です', { message: '少なくとも1枚の画像を追加してください', duration: 3000, native: true })
      return
    }
    setUploading(true)

    const body = JSON.stringify({
      images:  mediaFiles.map(m => m.url),
      caption,
      location,
    })

    try {
      await fetch('/api/insta/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
    } catch {
      toast.show('投稿に失敗しました', { message: '再度お試しください', native: true })
      setUploading(false)
    }
  }

  /* =============== UI =============== */
  return (
    <ToastProvider swipeDirection="right">
      <YStack flex={1} backgroundColor="$background" padding="$4">
        <YStack space="$4" maxWidth={600} marginHorizontal="auto" width="100%">
          {/* header */}
          <XStack justifyContent="space-between" alignItems="center">
            <H2 fontWeight="600">新規投稿</H2>
            <Button chromeless circular size="$3" icon={<X size="$1.5" />} />
          </XStack>

          <Separator />

          {/* tab switch */}
          <XStack backgroundColor="$gray3" borderRadius="$6" overflow="hidden" marginVertical="$2">
            {(['camera', 'gallery'] as const).map(tab => (
              <Button
                key={tab}
                flex={1}
                size="$4"
                backgroundColor={activeTab === tab ? '$color5' : 'transparent'}
                color={activeTab === tab ? '$color12' : '$color11'}
                onPress={() => setActiveTab(tab)}
                borderRadius={0}
                fontWeight={activeTab === tab ? '600' : '400'}
              >
                <XStack space="$2" alignItems="center">
                  {tab === 'camera' ? <Camera size="$1" /> : <ImageIcon size="$1" />}
                  <Text>{tab === 'camera' ? 'カメラ' : 'ギャラリー'}</Text>
                </XStack>
              </Button>
            ))}
          </XStack>

          {/* picker area */}
          <YStack
            borderWidth={1}
            borderColor="$gray5"
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
                    theme="blue"
                    borderRadius="$6"
                    onPress={() =>
                      activeTab === 'camera'
                        ? cameraInputRef.current?.click()
                        : galleryInputRef.current?.click()
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
                    theme="blue"
                    iconAfter={<Plus size="$1" />}
                    onPress={() =>
                      activeTab === 'camera'
                        ? cameraInputRef.current?.click()
                        : galleryInputRef.current?.click()
                    }
                  >
                    追加
                  </Button>
                </XStack>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <XStack space="$3" padding="$2.5">
                    {mediaFiles.map(({ file }, idx) => (
                      <Stack key={idx} position="relative">
                        {/* ← ここを file で参照 */}
                        <TImage
                          source={{ uri: URL.createObjectURL(file) }}
                          width={120}
                          height={120}
                          borderRadius="$4"
                        />
                        <Button
                          position="absolute"
                          top={-8}
                          right={-8}
                          size="$2"
                          circular
                          icon={Trash2}
                          theme="red"
                          onPress={() => removeImage(idx)}
                        />
                      </Stack>
                    ))}
                  </XStack>
                </ScrollView>
              </YStack>
            )}
          </YStack>

          {/* hidden inputs */}
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* caption & extras */}
          <YStack space="$3">
            <TextArea
              placeholder="キャプションを入力..."
              value={caption}
              onChangeText={setCaption}
              minHeight={100}
              borderColor="$gray5"
              borderWidth={1}
              borderRadius="$4"
              padding="$3"
              backgroundColor="$gray1"
            />

            <XStack space="$3" flexWrap="wrap">
              <Button size="$3" theme="gray" icon={MapPin} chromeless>
                {location || '場所を追加'}
              </Button>
              <Button size="$3" theme="gray" icon={Tag} chromeless>
                タグ付け
              </Button>
              <Button size="$3" theme="gray" icon={Smile} chromeless>
                絵文字
              </Button>
            </XStack>
          </YStack>

          {/* uploading sheet */}
          <Sheet modal open={uploading} snapPoints={[30]} disableDrag>
            <Sheet.Overlay backgroundColor="$color1" opacity={0.5} />
            <Sheet.Frame padding="$4" alignItems="center" justifyContent="center">
              <YStack space="$4" width="100%" alignItems="center">
                <Stack width="100%" height={6} backgroundColor="$gray4" borderRadius="$10" overflow="hidden">
                  <Stack
                    colors={['$blue8', '$purple8']}
                    start={[0, 0]}
                    end={[1, 0]}
                    width={`${uploadProgress}%`}
                    height="100%"
                  />
                </Stack>
                <Text fontWeight="500">アップロード中: {uploadProgress}%</Text>
              </YStack>
            </Sheet.Frame>
          </Sheet>

          {/* post button */}
          <Button
            size="$5"
            theme="blue"
            icon={<Upload size="$1.5" />}
            onPress={handlePost}
            disabled={uploading || mediaFiles.length === 0}
            opacity={mediaFiles.length === 0 ? 0.5 : 1}
            marginTop="$2"
            borderRadius="$6"
          >
            <Stack
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              borderRadius="$6"
              overflow="hidden"
              zIndex={-1}
              pointerEvents="none"
            >
              <Stack colors={['$blue9', '$purple9']} start={[0, 0]} end={[1, 0]} fullscreen />
            </Stack>
            投稿する
          </Button>
        </YStack>
      </YStack>

      <ToastViewport />
    </ToastProvider>
  )
}
