// packages/app/features/settings/SettingsScreen.tsx
'use client'

import React from 'react'
import { YStack, Paragraph, Switch, Button, Theme } from 'tamagui'

export function SettingsScreen() {
  // 状態管理：通知の有効化とダークモードの設定をサンプル状態として用意
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false)

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev)
    console.log('通知設定:', !notificationsEnabled)
  }

  const toggleDarkMode = () => {
    setDarkModeEnabled(prev => !prev)
    console.log('ダークモード設定:', !darkModeEnabled)
  }

  const handleSaveSettings = () => {
    // 設定を保存する処理（例: API 呼び出し、ローカルストレージへの保存など）
    console.log('設定を保存:', { notificationsEnabled, darkModeEnabled })
  }

  return (
    // darkModeEnabled の状態に応じてテーマを切り替える
    <Theme name={darkModeEnabled ? 'dark' : 'light'}>
      <YStack flex={1} padding="$4" space>
        <Paragraph fontSize="$4" fontWeight="bold" textAlign="center">
          設定
        </Paragraph>

        <YStack space>
          {/* 通知の有効化設定 */}
          <YStack horizontal alignItems="center" space>
            <Paragraph flex={1}>
              通知を有効にする
            </Paragraph>
            <Switch checked={notificationsEnabled} onChange={toggleNotifications} />
          </YStack>

          {/* ダークモード設定 */}
          <YStack horizontal alignItems="center" space>
            <Paragraph flex={1}>
              ダークモード
            </Paragraph>
            <Switch checked={darkModeEnabled} onChange={toggleDarkMode} />
          </YStack>
        </YStack>

        <Button onPress={handleSaveSettings}>
          設定を保存する
        </Button>
      </YStack>
    </Theme>
  )
}

export default SettingsScreen
