// packages/auth-next/hooks/useDummyAuth.tsx
'use client'

import React, { useState, useEffect } from 'react'

// ダミーユーザーの型定義例（必要に応じて独自に定義してください）
interface DummyUser {
  id: string
  name: string
  email: string
  avatarUrl: string
  bio: string
}

// ダミーデータとして使用するユーザー情報
const dummyUser: DummyUser = {
  id: 'dummy123',
  name: 'ダミー太郎',
  email: 'dummy@example.com',
  avatarUrl: 'https://dummyimage.com/100x100/000/fff.png&text=Avatar',
  bio: 'これはテスト用のダミーユーザーです。',
}

export const useDummyAuth = () => {
  const [user, setUser] = useState<DummyUser | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // マウント時に一定の遅延後、ダミーデータをセットする例
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(dummyUser)
      setIsLoading(false)
    }, 1000) // 1秒後にダミーデータを返す
    return () => clearTimeout(timer)
  }, [])

  const login = () => {
    // ダミーのログイン処理（実際にはAPI呼び出しなどを行うところを模擬）
    console.log('ダミーログインが呼ばれました')
    // 必要に応じて user の状態を更新することも可能
    setUser(dummyUser)
  }

  const logout = () => {
    console.log('ダミーログアウトが呼ばれました')
    setUser(null)
  }

  return { user, error, isLoading, login, logout }
}
