// packages/app/features/post/postScreen.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { YStack, XStack, H2, Separator, Button, Theme } from 'tamagui'
import { ToastProvider, ToastViewport, useToastController } from '@tamagui/toast'
import { X } from '@tamagui/lucide-icons'
import { TabSwitch } from './TabSwitch'
import { MediaPicker } from './MediaPicker'
import { CaptionWithGenerate } from './CaptionWithGenerate'
import { UploadProgressSheet } from './UploadProgressSheet'
import { PostButton } from './PostButton'
import { generateComment } from './generateComment'
import type { UploadedImage } from './types'

export function PostScreen() {
  const toast = useToastController()
  const [activeTab, setActiveTab] = useState<'camera' | 'gallery'>('camera')
  const [mediaFiles, setMediaFiles] = useState<UploadedImage[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // upload animation
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'))
    const newFiles = files.map(file => ({ file, url: URL.createObjectURL(file) }))
    setMediaFiles(prev => [...prev, ...newFiles])
  }

  const removeImage = (idx: number) => {
    setMediaFiles(prev => {
      const removed = prev[idx]
      URL.revokeObjectURL(removed.url)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handlePost = async () => {
    if (mediaFiles.length === 0) {
      toast.show('画像が必要です', { message: '少なくとも1枚の画像を追加してください', duration: 3000, native: true })
      return
    }
    setUploading(true)
    const body = JSON.stringify({ images: mediaFiles.map(m => m.url), caption, location })
    try {
      const res = await fetch('/api/insta/post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
      if (!res.ok) throw new Error()
    } catch {
      toast.show('投稿に失敗しました', { message: '再度お試しください', native: true })
      setUploading(false)
    }
  }

  const handleGenerate = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <Theme name="light">
      <ToastProvider swipeDirection="right">
        <YStack flex={1} backgroundColor="$background" padding="$4">
          <YStack space="$4" maxWidth={600} marginHorizontal="auto" width="100%">
            <XStack justifyContent="space-between" alignItems="center">
              <H2 fontWeight="600">新規投稿</H2>
              <Button chromeless circular size="$3" icon={<X size="$1.5" />} />
            </XStack>
            <Separator />

            <TabSwitch activeTab={activeTab} onChange={setActiveTab} />
            <MediaPicker activeTab={activeTab} mediaFiles={mediaFiles} onFileChange={handleFileChange} onRemove={removeImage} />
            <CaptionWithGenerate
              caption={caption}
              onChange={setCaption}
              isLoading={isLoading}
              onGenerate={handleGenerate}
              location={location}
              onAddLocation={() => {/* open location modal */}}
              onTag={() => {/* open tag selector */}}
            />
            <UploadProgressSheet uploading={uploading} progress={uploadProgress} />
            <PostButton disabled={uploading || mediaFiles.length === 0} onPress={handlePost} />
          </YStack>
        </YStack>
        <ToastViewport />
      </ToastProvider>
    </Theme>
  )
}
