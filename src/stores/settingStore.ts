import { themeColor } from './../utils/consts'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { clientPersister, zustandStorage } from '../utils/mmkvStorage'
interface UserState {
  language: Language
  notation: Notation
  autoRecord: boolean
  autoSubmitThreadhold: number
  themeColor: ThemeColor

  colorMode: ColorMode
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

const useSettingStore = create<Partial<SettingStoreState>>(set => ({
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
}))
export { useSettingStore }
// const useSettingStore = persist(settingStore, {
//   name: 'user-setting-storage', // name of the item in the storage (must be unique)
//   storage: createJSONStorage(() => zustandStorage) // (optional) by default, 'localStorage' is used
// })
// export { useSettingStore }
