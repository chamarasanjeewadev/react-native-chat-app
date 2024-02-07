import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import { zustandMKKVStorage } from '../utils/mmkvStorage'

interface AuthStoreInterface {
  isAADAuthenticated: boolean
  setAADAuthenticated: (isAADAuthenticated: boolean) => void
  idToken: string
  setIdToken: (idToken: string) => void

  isUserRegistered: boolean
  setUserRegistered: (isUserRegistered: boolean) => void

  user: User | null
  setUser: (user: User | null) => void

  // Onboarding
  nativeLanguage: string
  setNativeLanguage: (nativeLanguage: string) => void

  targetLanguage: string
  setTargetLanguage: (targetLanguage: string) => void

  age: string
  setAge: (age: string) => void

  name: string
  setName: (name: string) => void

  proficiency: string
  setProficiency: (proficiency: string) => void
}
const forPersist = persist<AuthStoreInterface>(
  set => ({
    isUserRegistered: false,
    setUserRegistered: (isUserRegistered: boolean) => set({ isUserRegistered }),

    idToken: '',
    setIdToken: (idToken: string) => set({ idToken }),

    isAADAuthenticated: false,
    setAADAuthenticated: (isAADAuthenticated: boolean) => set({ isAADAuthenticated }),

    user: null,
    setUser: (user: User | null) => set({ user }),

    nativeLanguage: '',
    setNativeLanguage: (nativeLanguage: string) => set({ nativeLanguage }),

    targetLanguage: '',
    setTargetLanguage: (targetLanguage: string) => set({ targetLanguage }),

    age: '',
    setAge: (age: string) => set({ age }),

    name: '',
    setName: (name: string) => set({ name }),

    proficiency: '',
    setProficiency: (proficiency: string) => set({ proficiency })
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => zustandMKKVStorage)
  }
)
const useAuthStore = create<Partial<AuthStoreInterface>>()(forPersist)
export { useAuthStore }
