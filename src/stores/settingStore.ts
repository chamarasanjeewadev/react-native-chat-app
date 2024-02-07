import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandMKKVStorage } from '../utils/mmkvStorage'
interface UserState {
  language: Language
  notation: Notation
  autoRecord: boolean
  autoSubmitThreadhold: number
}
interface SettingStoreState {
  themeColor: ThemeColor
  language: Language
  notation?: Notation
  autoRecord: boolean
  showRomaji: boolean
  autoSubmitThreadhold: number
  audioOnly: boolean
  colorMode: ColorMode
  setThemeColor: (themeColor: ThemeColor) => void

  setRomajiShown: (showRomaji: boolean) => void

  setAutoSubmitThreadhold: (autoSubmitThreadhold: number) => void

  setAutoRecord: (autoRecord: boolean) => void

  setAudioOnly: (audioOnly: boolean) => void

  setColorMode: (colorMode: ColorMode) => void
  setUserState: ({ language, notation, autoRecord, autoSubmitThreadhold }: UserState) => void
}
const forPersist = persist<Partial<SettingStoreState>>(
  set => ({
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

    setUserState: ({ language, notation, autoRecord, autoSubmitThreadhold }: UserState) =>
      set({ language, notation, autoRecord, autoSubmitThreadhold })
  }),
  {
    name: 'setting-storage',
    storage: createJSONStorage(() => zustandMKKVStorage)
  }
)
const useSettingStore = create<Partial<SettingStoreState>>()(forPersist)
export { useSettingStore }
