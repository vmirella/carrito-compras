import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { aliases, mdi } from 'vuetify/iconsets/mdi'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#D84315',
          'primary-lighten-1': '#FF7043',
          'primary-darken-1': '#BF360C',
          secondary: '#5D4037',

          background: '#FFF8F5',
          surface: '#FFFFFF',

          success: '#388E3C',
          error: '#E64A19',
          warning: '#F9A825',
          info: '#1976D2',

          // 🔥 TEXTOS
          'on-primary': '#FFFFFF', // sobre primary
          'on-secondary': '#FFFFFF', // sobre secondary
          'on-background': '#1A1A1A', // texto general
          'on-surface': '#1A1A1A', // cards, menus
          'on-success': '#FFFFFF',
          'on-error': '#FFFFFF',
          'on-warning': '#000000',
          'on-info': '#FFFFFF',

          // 🎨 CUSTOM (opcional pero recomendado)
          'text-main': '#2D2D2D',
          'text-muted': '#6B6B6B'
        }
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#FF8A65',
          secondary: '#5D3510',

          // 🔥 TEXTOS
          'on-primary': '#000000',
          'on-secondary': '#FFFFFF',
          'on-background': '#EDEDED',
          'on-surface': '#EDEDED',
          'on-success': '#000000',
          'on-error': '#000000',
          'on-warning': '#000000',
          'on-info': '#000000',

          // 🎨 CUSTOM
          'text-main': '#F5F5F5',
          'text-muted': '#B0B0B0'
        }
      }
    }
  }
})
