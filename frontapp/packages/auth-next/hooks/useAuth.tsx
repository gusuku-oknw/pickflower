// packages/auth-next/hooks/useAuth.tsx
'use client'

import React from 'react'
import { useUser } from '@auth0/nextjs-auth0' // 修正済みのインポート
// ※必要に応じてその他のインポートを追加

export const useAuth = () => {
  const { user, error, isLoading } = useUser()

  return {
    user,
    error,
    isLoading,
    login: () => {
      window.location.href = '/api/auth/login'
    },
    logout: () => {
      window.location.href = '/api/auth/logout'
    }
  }
}
