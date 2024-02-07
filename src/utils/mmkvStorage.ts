import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { MMKV } from 'react-native-mmkv'

import { StateStorage } from 'zustand/middleware'
const storage = new MMKV()
export const clientStorage = {
  setItem: <T extends string | number | boolean | Uint8Array>(key: string, value: T) => {
    storage?.set(key, value)
  },
  getItem: (key: string) => {
    const value = storage?.getString(key)
    return value === undefined ? null : value
  },
  removeItem: (key: string) => {
    storage?.delete(key)
  }
}
export const clientPersister = createSyncStoragePersister({
  storage: clientStorage
})

const zusStorage = new MMKV()

export const zustandMKKVStorage: StateStorage = {
  setItem: (name, value) => {
    return zusStorage?.set(name, value)
  },
  getItem: name => {
    const value = zusStorage?.getString(name)
    return value ?? null
  },
  removeItem: name => {
    return zusStorage?.delete(name)
  }
}
