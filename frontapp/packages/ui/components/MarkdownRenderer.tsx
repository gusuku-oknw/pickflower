// components/MarkdownRenderer.tsx
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ScrollView,
  Paragraph,
  Text,
  H2,
  H3,
  XStack,
  YStack,
  Separator,
} from 'tamagui'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ScrollView flex={1} padding="$4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <H2 {...props} color="$accent9" fontWeight="bold">
              {children}
            </H2>
          ),
          h2: ({ children, ...props }) => (
            <H3 {...props} color="$accent9" fontWeight="600">
              {children}
            </H3>
          ),
          p: ({ children, ...props }) => (
            <Paragraph {...props} color="$color" marginBottom="$3">
              {children}
            </Paragraph>
          ),
          a: ({ children, href, ...props }) => (
            <Text
              {...props}
              color="$accent9"
              onPress={() => {
                if (href) window.open(href, '_blank')
              }}
            >
              {children}
            </Text>
          ),
          ul: ({ children, ...props }) => (
            <YStack {...props} marginBottom="$3">
              {children}
            </YStack>
          ),
          ol: ({ children, ...props }) => (
            <YStack {...props} marginBottom="$3">
              {children}
            </YStack>
          ),
          li: ({ children, ...props }) => (
            <XStack {...props} key={Math.random()} marginLeft="$4">
              <Text color="$color" marginRight="$2">•</Text>
              <Text color="$color" flexShrink={1}>
                {children}
              </Text>
            </XStack>
          ),
          hr: () => <Separator marginVertical="$4" />,
          // 必要に応じて table, blockquote などもマッピング可能
        }}
      >
        {content}
      </ReactMarkdown>
    </ScrollView>
  )
}
