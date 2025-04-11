import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { bodyFont, headingFont } from './fonts'
import { animations } from './animations'
import { createTokens } from 'tamagui'

const tokens = createTokens({
  color: {
    pinkDark: '#610c62',
    pinkLight: '#f17efc',
  },
  // ... see configuration docs for required tokens
})

export const config = createTamagui({
  ...defaultConfig,
  animations,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  tokens: {
    ...defaultConfig.tokens,
    ...tokens,
  },
})
