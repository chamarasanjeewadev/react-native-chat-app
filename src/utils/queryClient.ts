import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import Snackbar from 'react-native-snackbar'
import { getDisplayError } from './errorUtil'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      console.log('error at query cache', error)
      const errormessage = error?.response?.data?.message
      if (errormessage) {
        const displayMessage = getDisplayError(errormessage)
        Snackbar.show({ text: displayMessage })
      }
      // useSettingStore.getState().setPremiumModal(true)
      // write logic to update zustand state
      throw error
    }
  }),
  mutationCache: new MutationCache({
    onError: error => {
      console.log('error at mutation cache', error)
    }
  }),
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24
    }
  }
})
