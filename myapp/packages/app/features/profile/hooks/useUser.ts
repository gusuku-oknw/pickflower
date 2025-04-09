// packages/app/features/profile/hooks/useUser.ts
import { useState, useEffect } from 'react'
import { fetchUserProfile } from '../api/profileAPI'

export function useUser(userId: string) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchUserProfile(userId)
      .then(data => {
        setUser(data)
        setError(null)
      })
      .catch(err => {
        setError(err)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [userId])

  return { user, loading, error }
}
