import { useColorScheme, vars } from 'nativewind'
import { themes } from '../utils/theme'
import { useSettingStore } from '../stores/settingStore'

export const useMTheme = () => {
  const [themeColor] = useSettingStore(state => [state.themeColor])
  const colorScheme = useColorScheme()
  const theme = vars(themes[themeColor ?? 'blue'][colorScheme.colorScheme ?? 'light'])
  return { theme }
}
