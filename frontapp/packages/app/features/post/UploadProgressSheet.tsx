import React from 'react'
import { Sheet, YStack, Stack, Text } from 'tamagui'

type Props = {
  uploading: boolean
  progress: number
}

export function UploadProgressSheet({ uploading, progress }: Props) {
  return (
    <Sheet modal open={uploading} snapPoints={[30]} disableDrag>
      <Sheet.Overlay backgroundColor="$color1" opacity={0.5} />
      <Sheet.Frame padding="$4" alignItems="center" justifyContent="center">
        <YStack space="$4" width="100%" alignItems="center">
          <Stack width="100%" height={6} backgroundColor="$gray4" borderRadius="$10" overflow="hidden">
            <Stack
              colors={["$blue8", "$purple8"]}
              start={[0, 0]}
              end={[1, 0]}
              width={`${progress}%`}
              height="100%"
            />
          </Stack>
          <Text fontWeight="500">アップロード中: {progress}%</Text>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}