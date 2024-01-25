import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
export const clientStorage = {
  setItem: <T extends string | number | boolean | Uint8Array>(
    key: string,
    value: T
  ) => {
    storage?.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage?.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage?.delete(key);
  },
};
export const clientPersister = createSyncStoragePersister({
  storage: clientStorage,
});
