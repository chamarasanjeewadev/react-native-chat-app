import { MESSAGES } from './consts'

export const getDisplayError = (errorMessage: string) => {
  console.log('error message', errorMessage)
  if (errorMessage?.trim() === MESSAGES.UPGRADE_TO_PREMIUM_ERROR) {
    return 'Upgrade to premium to use this feature'
  }
  return errorMessage
}
