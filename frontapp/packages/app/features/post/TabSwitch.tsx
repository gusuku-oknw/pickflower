import React from 'react'
import { Button, XStack, Text } from 'tamagui'
import { Camera, Image as ImageIcon } from '@tamagui/lucide-icons'

type Props = {
  activeTab: 'camera' | 'gallery'
  onChange: (tab: 'camera' | 'gallery') => void
}

export function TabSwitch({ activeTab, onChange }: Props) {
  return (
    <XStack borderRadius="$6" overflow="hidden" marginVertical="$2">
      {(['camera', 'gallery'] as const).map(tab => (
        <Button
          key={tab}
          flex={1}
          size="$4"
          bg={activeTab === tab ? '$accent5' : '$color0'}
          hoverStyle={{ backgroundColor: activeTab === tab ? '$accent1' : '$accent3' }}
          borderRadius={0}
          borderWidth={2}
          borderColor={activeTab === tab ? '$accent5' : '$color2'}
          borderStyle="solid"
          fontWeight={activeTab === tab ? '600' : '400'}
          onPress={() => onChange(tab)}
        >
          <XStack space="$2" alignItems="center">
            {tab === 'camera' ? <Camera size="$1" /> : <ImageIcon size="$1" />}
            <Text>{tab === 'camera' ? 'カメラ' : 'ギャラリー'}</Text>
          </XStack>
        </Button>
      ))}
    </XStack>
  )
}