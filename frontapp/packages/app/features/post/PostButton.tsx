import React from 'react'
import { Button, Stack } from 'tamagui'
import { Upload } from '@tamagui/lucide-icons'

type Props = {
  disabled: boolean
  onPress: () => void
}

export function PostButton({ disabled, onPress }: Props) {
  return (
    <Button
      size="$5"
      bg="$accent9"
      icon={<Upload size="$1.5" />}
      onPress={onPress}
      disabled={disabled}
      opacity={disabled ? 0.5 : 1}
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
        <Stack colors={["$color0", "$color0"]} start={[0, 0]} end={[1, 0]} fullscreen />
      </Stack>
      投稿する
    </Button>
  )
}