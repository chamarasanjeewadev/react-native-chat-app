import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChineseNotation, JapaneseNotation } from '../services/interface'
import { ThemeColor } from '../interfaces'
interface UserState {
  language: Language
  notation: Notation
  autoRecord: boolean
}
interface SettingStoreState {
  themeColor: ThemeColor
  language: Language
  notation?: Notation
  autoRecord: boolean
  showRomaji: boolean
  autoSubmitThreadhold: number
  audioOnly: boolean
  colorMode: 'dark' | 'light'
  setThemeColor: (themeColor: ThemeColor) => void

  setRomajiShown: (showRomaji: boolean) => void

  setAutoSubmitThreadhold: (autoSubmitThreadhold: number) => void

  setAutoRecord: (autoRecord: boolean) => void

  setAudioOnly: (audioOnly: boolean) => void

  setColorMode: (colorMode: 'dark' | 'light') => void
  setUserState: ({ language, notation, autoRecord }: UserState) => void
}
// const persistedSettingStore = persist(settingStore, { name: 'SETTING_STORE' })

export const useSettingStore = create<Partial<SettingStoreState>>(set => ({
  themeColor: 'blue',
  colorMode: 'light',
  audioOnly: false,
  showRomaji: true,
  autoRecord: false,
  autoSubmitThreadhold: 6,
  setThemeColor: (themeColor: ThemeColor) => set({ themeColor }),

  setAutoSubmitThreadhold: (autoSubmitThreadhold: number) => set({ autoSubmitThreadhold }),

  setAutoRecord: (autoRecord: boolean) => set({ autoRecord }),

  setAudioOnly: (audioOnly: boolean) => set({ audioOnly }),

  setColorMode: (colorMode: 'light' | 'dark') => set({ colorMode }),

  setUserState: ({ language, notation, autoRecord }: UserState) =>
    set({ language, notation, autoRecord })
}))
