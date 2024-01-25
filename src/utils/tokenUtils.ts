import { clientStorage as storage } from "./mmkvStorage";
const tokenName = "idToken";
const refreshTokenName = "refreshToken";
export const setIdToken = (token: string) => {
  storage.setItem(tokenName, token);
};
export const setRefreshToken = (token: string) => {
  storage.setItem(refreshTokenName, token);
};
export const getIdToken = () => {
  return storage.getItem(tokenName);
};
export const getRefreshToken = () => {
  return storage.getItem(refreshTokenName);
};
export const deleteIdToken = () => {
  return storage.removeItem(tokenName);
};
