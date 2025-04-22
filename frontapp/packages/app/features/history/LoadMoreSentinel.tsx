// components/LoadMoreSentinel.tsx
'use client'

import React from 'react'
import { YStack } from 'tamagui'

export const LoadMoreSentinel: React.FC<{ innerRef: React.Ref<HTMLDivElement> }> = ({ innerRef }) => (
  <YStack ref={innerRef} height={20} />
)
