import { createThemes, defaultComponentThemes } from '@tamagui/theme-builder'
import * as Colors from '@tamagui/colors'

// 自然な緑を基調としたパレット
// 暖かみのある自然な緑系カラーで農業のイメージに合わせています
const darkPalette = [
  'hsla(120, 15%, 12%, 1)', // 最も暗い緑
  'hsla(120, 15%, 16%, 1)',
  'hsla(120, 15%, 20%, 1)',
  'hsla(120, 15%, 24%, 1)',
  'hsla(120, 15%, 28%, 1)',
  'hsla(120, 15%, 32%, 1)',
  'hsla(120, 15%, 36%, 1)',
  'hsla(120, 15%, 40%, 1)',
  'hsla(120, 15%, 44%, 1)',
  'hsla(120, 15%, 48%, 1)',
  'hsla(120, 15%, 88%, 1)',
  'hsla(120, 15%, 94%, 1)' // 最も明るい緑
]

const lightPalette = [
  'hsla(120, 15%, 98%, 1)', // 最も明るい緑白
  'hsla(120, 15%, 94%, 1)',
  'hsla(120, 15%, 90%, 1)',
  'hsla(120, 15%, 86%, 1)',
  'hsla(120, 15%, 82%, 1)',
  'hsla(120, 15%, 78%, 1)',
  'hsla(120, 15%, 74%, 1)',
  'hsla(120, 15%, 70%, 1)',
  'hsla(120, 15%, 66%, 1)',
  'hsla(120, 15%, 62%, 1)',
  'hsla(120, 15%, 22%, 1)',
  'hsla(120, 15%, 12%, 1)' // 最も暗い緑
]

// 柔らかい影
const lightShadows = {
  shadow1: 'rgba(0,0,0,0.03)',
  shadow2: 'rgba(0,0,0,0.06)',
  shadow3: 'rgba(0,0,0,0.12)',
  shadow4: 'rgba(0,0,0,0.18)',
  shadow5: 'rgba(0,0,0,0.24)',
  shadow6: 'rgba(0,0,0,0.30)',
}

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.20)',
  shadow2: 'rgba(0,0,0,0.26)',
  shadow3: 'rgba(0,0,0,0.32)',
  shadow4: 'rgba(0,0,0,0.38)',
  shadow5: 'rgba(0,0,0,0.44)',
  shadow6: 'rgba(0,0,0,0.50)',
}

// アクセントカラーに収穫の色である明るいオレンジ系を採用
const accentLightPalette = [
  'hsla(32, 95%, 58%, 1)', // 柔らかいオレンジ
  'hsla(32, 95%, 60%, 1)',
  'hsla(32, 95%, 62%, 1)',
  'hsla(32, 95%, 64%, 1)',
  'hsla(32, 95%, 66%, 1)',
  'hsla(32, 95%, 68%, 1)',
  'hsla(32, 95%, 70%, 1)',
  'hsla(32, 95%, 72%, 1)',
  'hsla(32, 95%, 74%, 1)',
  'hsla(32, 95%, 76%, 1)',
  'hsla(32, 20%, 96%, 1)',
  'hsla(32, 20%, 98%, 1)',
]

const accentDarkPalette = [
  'hsla(32, 85%, 40%, 1)', // 暗めのオレンジ
  'hsla(32, 85%, 42%, 1)',
  'hsla(32, 85%, 44%, 1)',
  'hsla(32, 85%, 46%, 1)',
  'hsla(32, 85%, 48%, 1)',
  'hsla(32, 85%, 50%, 1)',
  'hsla(32, 85%, 52%, 1)',
  'hsla(32, 85%, 54%, 1)',
  'hsla(32, 85%, 56%, 1)',
  'hsla(32, 85%, 58%, 1)',
  'hsla(32, 20%, 90%, 1)',
  'hsla(32, 20%, 94%, 1)',
]

// 農業向けの特別なカラーセット
const farmColors = {
  // 土の色
  soil: {
    light: 'hsla(30, 40%, 50%, 1)',
    dark: 'hsla(30, 40%, 30%, 1)',
  },
  // 作物の色
  crop: {
    light: 'hsla(100, 60%, 45%, 1)',
    dark: 'hsla(100, 60%, 30%, 1)',
  },
  // 水の色
  water: {
    light: 'hsla(200, 70%, 60%, 1)',
    dark: 'hsla(200, 70%, 40%, 1)',
  },
  // 収穫の色
  harvest: {
    light: 'hsla(40, 90%, 60%, 1)',
    dark: 'hsla(40, 90%, 40%, 1)',
  }
}

// テーマを作成
const builtThemes = createThemes({
  componentThemes: {
    ...defaultComponentThemes,
    // 文字サイズを見やすく調整
    Text: {
      size: {
        xs: { fontSize: 14, lineHeight: 20 },
        sm: { fontSize: 16, lineHeight: 22 },
        md: { fontSize: 18, lineHeight: 24 },
        lg: { fontSize: 20, lineHeight: 28 },
        xl: { fontSize: 24, lineHeight: 32 },
        '2xl': { fontSize: 28, lineHeight: 36 },
        '3xl': { fontSize: 32, lineHeight: 40 },
        '4xl': { fontSize: 40, lineHeight: 48 },
        true: { fontSize: 18, lineHeight: 24 },
      }
    },
    // 入力フォームも大きめに
    Input: {
      size: {
        sm: { height: 38, borderRadius: 8, fontSize: 16 },
        md: { height: 46, borderRadius: 10, fontSize: 18 },
        lg: { height: 54, borderRadius: 12, fontSize: 20 },
      }
    }
  },

  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },

    extra: {
      light: {
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
        ...farmColors.soil,
        ...farmColors.crop,
        ...farmColors.water,
        ...farmColors.harvest,
        // 大きめフォントサイズ
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '$true',
      },
      dark: {
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
        // 農業カラー（ダークモード用）
        soil: farmColors.soil.dark,
        crop: farmColors.crop.dark,
        water: farmColors.water.dark,
        harvest: farmColors.harvest.dark,
        // 大きめフォントサイズ
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '$true',
      },
    },
  },

  // アクセントテーマ - 収穫カラー（オレンジ系）
  accent: {
    palette: {
      light: accentLightPalette,
      dark: accentDarkPalette,
    },
  },

  // サブテーマ
  childrenThemes: {
    // 警告色 - 黄色系 (害虫や天候警告など)
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },

    // エラー色 - 赤系 (危険や重要なエラー)
    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },

    // 成功色 - 緑系 (収穫成功や投稿完了など)
    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },

    // 水関連 - 青系 (水やり記録など)
    water: {
      palette: {
        dark: ['hsla(200, 70%, 25%, 1)', 'hsla(200, 70%, 30%, 1)', 'hsla(200, 70%, 35%, 1)', 'hsla(200, 70%, 40%, 1)', 'hsla(200, 70%, 45%, 1)', 'hsla(200, 70%, 50%, 1)', 'hsla(200, 70%, 55%, 1)', 'hsla(200, 70%, 60%, 1)', 'hsla(200, 70%, 65%, 1)', 'hsla(200, 70%, 70%, 1)', 'hsla(200, 40%, 90%, 1)', 'hsla(200, 40%, 95%, 1)'],
        light: ['hsla(200, 70%, 45%, 1)', 'hsla(200, 70%, 50%, 1)', 'hsla(200, 70%, 55%, 1)', 'hsla(200, 70%, 60%, 1)', 'hsla(200, 70%, 65%, 1)', 'hsla(200, 70%, 70%, 1)', 'hsla(200, 70%, 75%, 1)', 'hsla(200, 70%, 80%, 1)', 'hsla(200, 70%, 85%, 1)', 'hsla(200, 70%, 90%, 1)', 'hsla(200, 40%, 96%, 1)', 'hsla(200, 40%, 98%, 1)'],
      },
    },

    // 土関連 - 茶系 (土壌記録など)
    soil: {
      palette: {
        dark: ['hsla(30, 40%, 20%, 1)', 'hsla(30, 40%, 25%, 1)', 'hsla(30, 40%, 30%, 1)', 'hsla(30, 40%, 35%, 1)', 'hsla(30, 40%, 40%, 1)', 'hsla(30, 40%, 45%, 1)', 'hsla(30, 40%, 50%, 1)', 'hsla(30, 40%, 55%, 1)', 'hsla(30, 40%, 60%, 1)', 'hsla(30, 40%, 65%, 1)', 'hsla(30, 20%, 90%, 1)', 'hsla(30, 20%, 95%, 1)'],
        light: ['hsla(30, 40%, 40%, 1)', 'hsla(30, 40%, 45%, 1)', 'hsla(30, 40%, 50%, 1)', 'hsla(30, 40%, 55%, 1)', 'hsla(30, 40%, 60%, 1)', 'hsla(30, 40%, 65%, 1)', 'hsla(30, 40%, 70%, 1)', 'hsla(30, 40%, 75%, 1)', 'hsla(30, 40%, 80%, 1)', 'hsla(30, 40%, 85%, 1)', 'hsla(30, 20%, 96%, 1)', 'hsla(30, 20%, 98%, 1)'],
      },
    },
  },

  // サブテーマの派生テーマ
  grandChildrenThemes: {
    alt1: {
      template: 'alt1',
    },
    alt2: {
      template: 'alt2',
    },
    surface1: {
      template: 'surface1',
    },
    surface2: {
      template: 'surface2',
    },
    surface3: {
      template: 'surface3',
    },
  },
})

export type Themes = typeof builtThemes

// client-side bundle size optimization
export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === 'client' &&
  process.env.NODE_ENV === 'production'
    ? ({} as any)
    : (builtThemes as any)