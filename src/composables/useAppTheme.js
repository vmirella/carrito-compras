import { useThemeStore } from '@/stores/theme'
import { useTheme } from 'vuetify'

export function useAppTheme() {
  const store = useThemeStore()
  const vuetifyTheme = useTheme()

  const toggle = () => {
    store.toggleTheme()
    vuetifyTheme.global.name.value = store.theme
  }

  return {
    theme: store,
    toggle
  }
}
