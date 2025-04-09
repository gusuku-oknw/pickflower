'use client'

import { useState, useEffect } from 'react'
import { YStack } from 'tamagui'
import { ProfileScreen } from 'app/features/profile/ProfileScreen'
import HamburgerMenu from '@my/ui/components/HamburgerMenu' // エイリアス設定に合わせて
import { supabase } from '../utils/supabase'

export default function ProfilePage() {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    // async 関数を定義して即時実行
    (async () => {
      try {
        const { data, error } = await supabase.from('todos').select('*')
        if (error) {
          console.error('Error fetching todos:', error.message)
        } else if (data && data.length > 0) {
          setTodos(data)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
      }
    })()
  }, [])

  return (
    <YStack flex={1} padding="$4">
      <HamburgerMenu />
      <ProfileScreen />
      <div>
        {todos.map((todo, index) => (
          <li key={index}>{JSON.stringify(todo)}</li>
        ))}
      </div>
    </YStack>
  )
}
