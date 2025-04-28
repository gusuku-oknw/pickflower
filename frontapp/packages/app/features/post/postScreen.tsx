// packages/app/features/post/postScreen.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'solito/navigation'
import { useSupabaseAuth } from '../../../../packages/auth-next/hooks/useSupabaseAuth'
import {
  YStack,
  XStack,
  H2,
  Separator,
  Button,
  Theme,
  Spinner
} from 'tamagui'
import {
  ToastProvider,
  ToastViewport,
  useToastController
} from '@tamagui/toast'
import { X as CloseIcon } from '@tamagui/lucide-icons'
import AsyncStorage from '@callstack/async-storage'
import { TabSwitch } from './TabSwitch'
import { MediaPicker } from './MediaPicker'
import { CaptionWithGenerate } from './CaptionWithGenerate'
import { UploadProgressSheet } from './UploadProgressSheet'
import { PostButton } from './PostButton'
import type { UploadedImage } from './types'
import { PromptSheet } from '../../../ui/components/PromptSheet'

// 画像を圧縮するユーティリティ関数
async function compressImage(
  file: File,
  maxWidth = 800,
  quality = 0.7
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        URL.revokeObjectURL(url)
        blob ? resolve(blob) : reject(new Error('圧縮に失敗しました'))
      }, 'image/jpeg', quality)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('画像読み込みに失敗しました'))
    }
    img.src = url
  })
}

const STORAGE_KEY = 'userPrompts'

export function PostScreen() {
  // ── すべてのフックはコンポーネント冒頭で宣言 ──
  const toast = useToastController()
  const router = useRouter()
  const { user, loading, error } = useSupabaseAuth()

  const [activeTab, setActiveTab] = useState<'camera' | 'gallery'>('camera')
  const [mediaFiles, setMediaFiles] = useState<UploadedImage[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // 認証が確定したらリダイレクト（フック順序に影響なし） :contentReference[oaicite:2]{index=2}
  useEffect(() => {
    if (!loading && (!user || error)) {
      router.replace('/login')
    }
  }, [loading, user, error, router])

  // アップロード進捗管理副作用（同じ位置で常に実行） :contentReference[oaicite:3]{index=3}
  useEffect(() => {
    if (uploading && uploadProgress < 100) {
      const t = setTimeout(
        () => setUploadProgress(p => Math.min(p + 10, 100)),
        300
      )
      return () => clearTimeout(t)
    }
    if (uploading && uploadProgress === 100) {
      setUploading(false)
      setUploadProgress(0)
      toast.show('投稿が完了しました', {
        message: 'フォロワーに表示されます',
        duration: 3000
      })
      setMediaFiles([])
      setCaption('')
      setLocation('')
    }
  }, [uploading, uploadProgress, toast])

  // ── 早期リターン ──
  if (loading || !user) {
    return (
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$background"
      >
        <Spinner size="large" color="$accent9" />
      </YStack>
    )
  }

  // 以下、ハンドラやレンダー（フック呼び出しはここまで固定）
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f =>
      f.type.startsWith('image/')
    )
    if (!files.length) return
    const file = files[0]
    const url = URL.createObjectURL(file)
    setMediaFiles(prev => [...prev, { file, url }])
  }

  const removeImage = (idx: number) => {
    setMediaFiles(prev => {
      URL.revokeObjectURL(prev[idx].url)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handlePost = async () => {
    if (!mediaFiles.length) {
      toast.show('画像を追加してください', { duration: 3000 })
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      for (const { file } of mediaFiles) {
        const blob = await compressImage(file, 800, 0.7)
        formData.append(
          'files',
          new File([blob], file.name, { type: 'image/jpeg' })
        )
      }
      formData.append('caption', caption)
      formData.append('location', location)

      const res = await fetch('/api/insta/post', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('投稿に失敗しました')
    } catch {
      toast.show('投稿に失敗しました', { duration: 3000 })
    } finally {
      setUploading(false)
    }
  }

  const handleGenerate = async () => {
    if (!mediaFiles.length) {
      toast.show('画像を入れてください', { duration: 3000 })
      return
    }
    setIsLoading(true)
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const prompts: string[] = raw ? JSON.parse(raw) : []
      const prompt = prompts[0] || ''

      const blob = await compressImage(mediaFiles[0].file, 800, 0.7)
      const dataUrl: string = await new Promise((res, rej) => {
        const reader = new FileReader()
        reader.onload = () => res(reader.result as string)
        reader.onerror = () => rej(reader.error)
        reader.readAsDataURL(blob)
      })

      const response = await fetch('/api/generateComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, dataUrl })
      })
      if (!response.ok) throw new Error('コメント生成に失敗しました')
      const { comment } = await response.json()
      setCaption(comment)
    } catch (err: any) {
      toast.show(err.message || 'コメント生成に失敗しました', {
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Theme name="light">
      <ToastProvider swipeDirection="right">
        <YStack flex={1} backgroundColor="$background" padding="$4">
          <YStack
            space="$4"
            maxWidth={600}
            marginHorizontal="auto"
            width="100%"
          >
            <XStack
              justifyContent="space-between"
              alignItems="center"
            >
              <H2 fontWeight="600">新規投稿</H2>
              <PromptSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
              >
                <Button
                  chromeless
                  circular
                  size="$3"
                  icon={<CloseIcon size="$1.5" />}
                />
              </PromptSheet>
            </XStack>
            <Separator />
            <TabSwitch
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            <MediaPicker
              activeTab={activeTab}
              mediaFiles={mediaFiles}
              onFileChange={handleFileChange}
              onRemove={removeImage}
            />
            <CaptionWithGenerate
              caption={caption}
              onChange={setCaption}
              isLoading={isLoading}
              onGenerate={handleGenerate}
              location={location}
              onAddLocation={() => {}}
              onTag={() => {}}
            />
            <UploadProgressSheet
              uploading={uploading}
              progress={uploadProgress}
            />
            <PostButton
              disabled={uploading || !mediaFiles.length}
              onPress={handlePost}
            />
          </YStack>
        </YStack>
        <ToastViewport />
      </ToastProvider>
    </Theme>
  )
}
